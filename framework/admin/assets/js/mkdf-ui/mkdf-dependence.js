(function($) {
    "use strict";

	window.mkdfDependencyAdmin = {};
	
	mkdfDependencyAdmin.mkdfReInitOptionsDependency = mkdfReInitOptionsDependency;
	
	$(document).ready(function () {
		mkdfInitOptionsDependency().init();
		mkdfInitSelectChange();
		mkdfInitIconSelectChange();
		mkdfInitRadioChange();
	});
	
	function mkdfReInitOptionsDependency() {
		mkdfInitOptionsDependency().init(true);
	}
	
	var mkdfInitOptionsDependency = function () {
		
		function getNumberOfItems(items) {
			var numberOfItems = 0;
			
			for (var item in items) {
				if (items.hasOwnProperty(item)) {
					++numberOfItems;
				}
			}
			
			return numberOfItems;
		}
		
		function multipleDependencyLogic(items, optionHolder, optionName, optionValue, dependencyType) {
			var flag = [],
				itemVisibility = true;
			
			$.each(items, function (key, value) {
				value = value.split(',');
				
				if (optionName === key) {
					if (value.indexOf(optionValue) !== -1) {
						flag.push(true);
					} else {
						flag.push(false);
					}
				} else {
					var otherOptionType = $('.mkdf-dependency-option[data-option-name="' + key + '"]').data('option-type');
					switch (otherOptionType) {
						case 'checkbox':
							var otherValue = $('.mkdf-dependency-option[data-option-name="' + key + '"]').find('input[type="hidden"][name="' + key + '"]').val();
							break;
						case 'selectbox':
							var otherValue = $('.mkdf-dependency-option[data-option-name="' + key + '"]').val();
							break;
					}
					
					if (value.indexOf(otherValue) !== -1) {
						flag.push(true);
					} else {
						flag.push(false);
					}
				}
			});
			
			for (var f in flag) {
				if (!flag[f]) itemVisibility = false;
			}
			
			if (dependencyType === 'show') {
				
				if (itemVisibility) {
					optionHolder.fadeIn(200);
				} else {
					optionHolder.fadeOut(200);
				}
			} else {
				
				if (itemVisibility) {
					optionHolder.fadeOut(200);
				} else {
					optionHolder.fadeIn(200);
				}
			}
		}
		
		function singleDependencyLogic(items, optionHolder, optionName, optionValue, dependencyType) {
			$.each(items, function (key, value) {
				if (optionName === key) {
					value = value.split(',');
					
					if (dependencyType === 'show') {
						if (value.indexOf(optionValue) !== -1) {
							optionHolder.fadeIn(200);
						} else {
							optionHolder.fadeOut(200);
						}
					} else {
						if (value.indexOf(optionValue) !== -1) {
							optionHolder.fadeOut(200);
						} else {
							optionHolder.fadeIn(200);
						}
					}
				}
			});
		}
		
		function mainLogic(thisItem, optionValue) {
			var dependencyHolder = $('.mkdf-dependency-holder'),
				optionName = thisItem.data('option-name');
			
			if (dependencyHolder.length && optionName !== undefined && optionName !== '' && optionValue !== undefined) {
				dependencyHolder.each(function () {
					var thisHolder = $(this),
						showDataItems = thisHolder.data('show'),
						hideDataItems = thisHolder.data('hide');
					
					if (showDataItems !== '' && showDataItems !== undefined) {
						if (getNumberOfItems(showDataItems) > 1) {
							multipleDependencyLogic(showDataItems, thisHolder, optionName, optionValue, 'show');
						} else {
							singleDependencyLogic(showDataItems, thisHolder, optionName, optionValue, 'show');
						}
					}
					
					if (hideDataItems !== '' && hideDataItems !== undefined) {
						if (getNumberOfItems(hideDataItems) > 1) {
							multipleDependencyLogic(hideDataItems, thisHolder, optionName, optionValue, 'hide');
						} else {
							singleDependencyLogic(hideDataItems, thisHolder, optionName, optionValue, 'hide');
						}
					}
				});
			}
		}
		
		function checkBox(thisItem, repeater) {
			var cbItem = thisItem.find('.cb-enable, .cb-disable');
			
			if (repeater) {
				var repeaterOptionValue = thisItem.find('.selected').data('value');
				
				if (thisItem.parents('.mkdf-repeater-fields-holder').length && repeaterOptionValue !== undefined) {
					mainLogic(thisItem, repeaterOptionValue);
				}
			}
			
			cbItem.on('click', function (e) {
				var optionValue = $(this).data('value');
				mainLogic(thisItem, optionValue);
			});
		}
		
		function selectBox(thisItem, repeater) {
			if (repeater && thisItem.parents('.mkdf-repeater-fields-holder').length) {
				mainLogic(thisItem, thisItem.val());
			}
			
			thisItem.on('change', function () {
				var optionValue = $(this).val();
				mainLogic(thisItem, optionValue);
			});
		}
		
		function radioGroup(thisItem, repeater) {
			var optionName = thisItem.data('option-name'),
				radioItem = thisItem.find('input[name=' + optionName + ']');
			
			if (repeater && thisItem.parents('.mkdf-repeater-fields-holder').length) {
				mainLogic(thisItem, radioItem.value);
			}
			
			radioItem.on('change', function () {
				var optionValue = this.value;
				mainLogic(thisItem, optionValue);
			});
		}
		
		return {
			init: function (repeater) {
				var dependencyOption = $('.mkdf-section-content .mkdf-field[data-option-name]');
				
				if (dependencyOption.length) {
					dependencyOption.each(function () {
						var thisOptions = $(this),
							thisOptionsType = thisOptions.data('option-type');
						
						thisOptions.addClass('mkdf-dependency-option');
						
						switch (thisOptionsType) {
							case 'checkbox':
								checkBox(thisOptions, repeater);
								break;
							case 'selectbox':
								selectBox(thisOptions, repeater);
								break;
							case 'radiogroup':
								radioGroup(thisOptions, repeater);
								break;
						}
					});
				}
			}
		};
	};
	
	function mkdfInitSelectChange() {
		$(document).on('change', 'select.dependence', function (e) {
			var thisItem = $(this),
				valueSelected = this.value.replace(/ /g, '');
			
			$(thisItem.data('hide-' + valueSelected)).fadeOut();
			$(thisItem.data('show-' + valueSelected)).fadeIn();
		});
	}

    function mkdfInitIconSelectChange() {
        $(document).on('change', 'select.icon-dependence', function (e) {
            var valueSelected = this.value.replace(/ /g, ''),
            	parentSection = $(this).parents('.mkdf-section-content');

            parentSection.find('.row.mkdf-icon-collection-holder').fadeOut();
            parentSection.find('.row.mkdf-icon-collection-holder[data-icon-collection="' + valueSelected + '"]').fadeIn();
        });
    }
	
	function mkdfInitRadioChange() {
		$(document).on('change', 'input[type="radio"].dependence', function () {
			var thisItem = $(this),
				dataHide = thisItem.data('hide'),
				dataShow = thisItem.data('show');
			
			if (typeof(dataHide) !== 'undefined' && dataHide !== '') {
				var elementsToHide = dataHide.split(',');
				
				$.each(elementsToHide, function (index, value) {
					$(value).fadeOut();
				});
			}
			
			if (typeof(dataShow) !== 'undefined' && dataShow !== '') {
				var elementsToShow = dataShow.split(',');
				
				$.each(elementsToShow, function (index, value) {
					$(value).fadeIn();
				});
			}
		});
	}
	
})(jQuery);