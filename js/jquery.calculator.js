/**
 * @author Reylee
 * 数字加减计算器
 */
;(function ($) {
    $.fn.calculator = function (options) {
        var defaultOptions = {
            btnBgColor: "#1bc4c4",
            initValue: 0,
            width: "300",
            addClass: "addBtn",
            numClass: "numText",
            decClass: "decBtn",
        };
        defaultOptions = $.extend(defaultOptions, options || {});

        var _calculator = $(this);
        var _addBtn = _calculator.find('.addBtn');
        var _decBtn = _calculator.find('.decBtn');
        var _numText = _calculator.find('.numText');

        var calculator = {
            _numValue: defaultOptions.initValue,
            _width: defaultOptions.width,
            init: function () {
                // 重置样式
                this.resetStyle();
                // 事件监听
                this.initListeners();
            },
            resetStyle: function () {
                _calculator.width(this._width);
                _numText.val(this._numValue);
                _addBtn.css({
                    "background": defaultOptions.btnBgColor
                });
                _decBtn.css({
                    "background": defaultOptions.btnBgColor
                })
                
                /**
                 *  btn 设置只读/失效
                 *  一、_decBtn.attr("readonly", "readonly");.
                 *  二、_decBtn.prop("disabled",true)
                 */
                
                if(defaultOptions.btnBgColor>0){
	               	_decBtn.prop("disabled", true);
                }
            },
            numKeyUp: function () {
                var numValue = _numText.val();
                if (isNaN(numValue) || parseInt(numValue) != numValue || parseInt(numValue) < 1) {
                    _numText.val(0);
                    this._numValue = 0;
                    return;
                } else {
                    this._numValue = numValue;
                    _numText.val(this._numValue);
                }
            },
            // +1
            numAdd: function () {
                var numValue = this._numValue;
                var numValue_add = parseInt(numValue) + 1;
                //var price = document.getElementById("price").value;
                if (numValue === "" || numValue == null) {
                    numValue_add = 0;
                    _decBtn.prop("disabled", true);

                }
                _decBtn.prop("disabled") ? _decBtn.removeProp("disabled") : null;
                this._numValue = numValue_add;
                _numText.val(this._numValue);
                //var totalValue = price * numValue_add;
                // document.getElementById("totalPrice").innerHTML = numValue.toFixed(2);
            },
            // -1
            numDec: function () {
                var numValue = this._numValue;
                var numValue_dec = parseInt(numValue) - 1;
                //var price = document.getElementById("price").value;
                if (numValue_dec <= 0) {
                    _decBtn.prop("disabled", true)
                }
                this._numValue = numValue_dec;
                _numText.val(this._numValue);
            },
            format: function (val, digit) {
                if (isNaN(val)) {
                    val = 0;
                }
                return parseFloat(val).toFixed(digit);
            },
            initListeners: function () {
                var _this = this;
                _addBtn.click(function () {
                    _this.numAdd();
                });
                _decBtn.click(function () {
                    _this.numDec();
                });
                _numText.keyup(function () {
                    _this.numKeyUp();
                })
            },
        }
        calculator.init();
    }
})(jQuery);
