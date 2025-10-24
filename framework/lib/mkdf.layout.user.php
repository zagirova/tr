<?php

/*
   Class: WilmerMikadoClassUserField
   A class that initializes WilmerMikadoClass User Field
*/
class WilmerMikadoClassUserField implements iWilmerMikadoInterfaceRender {
	private $type;
	private $name;
	private $label;
	private $description;
	private $options = array();
	private $args = array();
	
	function __construct( $type, $name, $label = "", $description = "", $options = array(), $args = array() ) {
		$this->type        = $type;
		$this->name        = $name;
		$this->label       = $label;
		$this->description = $description;
		$this->options     = $options;
		$this->args        = $args;
		add_filter( 'wilmer_mikado_filter_user_fields', array( $this, 'addFieldForEditSave' ) );
	}
	
	public function addFieldForEditSave( $names ) {
		
		$names[] = $this->name;
		
		return $names;
	}
	
	public function render( $factory ) {
		$factory->render( $this->type, $this->name, $this->label, $this->description, $this->options, $this->args );
	}
}

abstract class WilmerMikadoClassUserFieldType {
	abstract public function render( $name, $label = "", $description = "", $options = array(), $args = array() );
}

class WilmerMikadoClassUserFieldText extends WilmerMikadoClassUserFieldType {
	public function render( $name, $label = "", $description = "", $options = array(), $args = array() ) {
		$user_id = isset( $_GET['user_id'] ) && ! empty( $_GET['user_id'] ) ? $_GET['user_id'] : get_current_user_id();
		$value   = get_user_meta( intval( $user_id ), $name, true );
		?>
		<tr>
			<th>
				<label for="<?php echo esc_attr( $name ); ?>"><?php echo esc_html( $label ); ?></label>
			</th>
			<td>
				<input type="text" name="<?php echo esc_attr( $name ); ?>" id="<?php echo esc_attr( $name ); ?>" value="<?php echo esc_attr( $value ) ? esc_attr( $value ) : ''; ?>" class="regular-text">
				<p class="description"><?php echo esc_html( $description ); ?></p>
			</td>
		</tr>
		<?php
	}
}

class WilmerMikadoClassUserFieldSelect extends WilmerMikadoClassTaxonomyFieldType {
	public function render( $name, $label = "", $description = "", $options = array(), $args = array() ) {
		$user_id        = isset( $_GET['user_id'] ) && ! empty( $_GET['user_id'] ) ? $_GET['user_id'] : get_current_user_id();
		$selected_value = get_user_meta( intval( $user_id ), $name, true );
		?>
		<tr>
			<th>
				<label for="<?php echo esc_attr( $name ); ?>"><?php echo esc_html( $label ); ?></label>
			</th>
			<td>
				<select name="<?php echo esc_attr( $name ); ?>" id="<?php echo esc_attr( $name ); ?>">
					<option <?php if ( $selected_value == "" ) { echo "selected='selected'"; } ?> value=""></option>
					<?php foreach ( $options as $key => $value ) {
						if ( $key == "-1" ) {
							$key = "";
						} ?>
						<option <?php if ( $selected_value == $key ) { echo "selected='selected'"; } ?> value="<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $value ); ?></option>
					<?php } ?>
				</select>
				<p class="description"><?php echo esc_html( $description ); ?></p>
			</td>
		</tr>
		<?php
	}
}

class WilmerMikadoClassUserFieldImage extends WilmerMikadoClassUserFieldType {
	public function render( $name, $label = "", $description = "", $options = array(), $args = array() ) {
		$user_id = isset( $_GET['user_id'] ) && ! empty( $_GET['user_id'] ) ? $_GET['user_id'] : get_current_user_id();
		$value   = get_user_meta( intval( $user_id ), $name, true );
		?>
		<tr>
			<th>
				<label for="<?php echo esc_attr( $name ); ?>"><?php echo esc_html( $label ); ?></label>
				<p class="description"><?php echo esc_html( $description ); ?></p>
			</th>
			<td class="mkdf-user-image-field">
				<input type="hidden" name="<?php echo esc_attr( $name ); ?>" id="<?php echo esc_attr( $name ); ?>" class="mkdf-user-custom-media-url" value="<?php echo esc_attr( $value ) ?>">
				<div class="mkdf-user-image-wrapper">
					<?php if ( $value ) { ?>
						<?php echo wp_get_attachment_image( $value, 'thumbnail' ); ?>
					<?php } ?>
				</div>
				<p>
					<input type="button" class="button button-secondary mkdf-user-media-add" name="mkdf-user-media-add" value="<?php esc_attr_e( 'Add Image', 'wilmer' ); ?>"/>
					<input data-userid="<?php echo esc_attr( $_GET['user_id'] ); ?>" type="button" class="button button-secondary mkdf-user-media-remove" name="mkdf-user-media-remove" value="<?php esc_attr_e( 'Remove Image', 'wilmer' ); ?>"/>
				</p>
			</td>
		</tr>
		<?php
	}
}

/*
   Class: WilmerMikadoClassUserGroup
   A class that initializes Mikado User Group
*/
class WilmerMikadoClassUserGroup implements iWilmerMikadoInterfaceLayoutNode, iWilmerMikadoInterfaceRender {
	public $children;
	public $title;
	public $description;
	
	function __construct( $title_user = "", $description = "" ) {
		$this->children    = array();
		$this->title       = $title_user;
		$this->description = $description;
	}
	
	public function hasChidren() {
		return ( count( $this->children ) > 0 ) ? true : false;
	}
	
	public function getChild( $key ) {
		return $this->children[ $key ];
	}
	
	public function addChild( $key, $value ) {
		$this->children[ $key ] = $value;
	}
	
	public function render( $factory ) { ?>
		<h2><?php echo esc_html( $this->title ); ?></h2>
		<table class="form-table">
			<tbody>
			<?php foreach ( $this->children as $child ) {
				$this->renderChild( $child, $factory );
			} ?>
			</tbody>
		</table>
		<?php
	}
	
	public function renderChild( iWilmerMikadoInterfaceRender $child, $factory ) {
		$child->render( $factory );
	}
}

class WilmerMikadoClassUserFieldFactory {
	public function render( $field_type, $name, $label = "", $description = "", $options = array(), $args = array(), $hidden = false ) {
		
		switch ( strtolower( $field_type ) ) {
			case 'text':
				$field = new WilmerMikadoClassUserFieldText();
				$field->render( $name, $label, $description, $options, $args, $hidden );
				break;
			case 'select':
				$field = new WilmerMikadoClassUserFieldSelect();
				$field->render( $name, $label, $description, $options, $args, $hidden );
				break;
			case 'image':
				$field = new WilmerMikadoClassUserFieldImage();
				$field->render( $name, $label, $description, $options, $args, $hidden );
				break;
			default:
				break;
		}
	}
}
