// open characteristics block - dropdown

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Slide = function () {
        function Slide(node, opt) {
            _classCallCheck(this, Slide);

            this.opt = opt || {};
            this.option = Object.assign({
                btn: '[data-button]',
                box: '[data-box-dropdown]',
                indicator: '[data-indicator]',
                transition: 600,
                onOpen: null
            }, this.opt);
            this.node = node;
            this.btn = this.node.querySelector(this.option.btn);
            this.box = this.node.querySelector(this.option.box);
            this.indicator = this.node.querySelector(this.option.indicator);
            this.indicator.style.transition = this.option.transition + 'ms';
            this.heightBox = null;
            this.open = false;
        }

        _createClass(Slide, [{
            key: "down",
            value: function down() {
                var _this = this;

                function getSizeBoxes(elem) {
                    var elemWidth = elem.getBoundingClientRect().right - elem.getBoundingClientRect().left;
                    var elemHeight = elem.getBoundingClientRect().bottom - elem.getBoundingClientRect().top;
                    return {
                        width: elemWidth,
                        height: elemHeight
                    };
                }

                var downBlock = new Promise(function (resolve, reject) {
                    _this.box.style.height = '';
                    _this.box.style.opacity = '0';
                    _this.box.style.display = 'block';
                    _this.heightBox = getSizeBoxes(_this.box).height;
                    _this.box.style.height = '0';
                    resolve();
                }).then(function () {
                    setTimeout(function () {
                        _this.box.style.transition = _this.option.transition + 'ms';
                        _this.box.style.opacity = '1';
                        _this.box.style.height = _this.heightBox + 'px';
                        _this.indicator.style.transition = _this.option.transition + 'ms';

                        _this.indicator.classList.add('open');

                        _this.open = true;
                    }, 0);
                });
            }
        }, {
            key: "up",
            value: function up() {
                var _this2 = this;

                var upBlock = new Promise(function (resolve, reject) {
                    _this2.box.style.height = '0';
                    _this2.box.style.opacity = '0';

                    _this2.indicator.classList.remove('open');

                    resolve();
                }).then(function () {
                    setTimeout(function () {
                        _this2.box.style.display = 'none';
                        _this2.open = false;
                    }, _this2.option.transition);
                });
            }
        }]);

        return Slide;
    }();

if (document.querySelectorAll('.product-characteristics-column').length) {
        var slides = document.querySelectorAll('.product-characteristics-column');
        [].forEach.call(slides, function (el) {
            var slide = new Slide(el, {
                transition: 400
            });

            slide.toggle = function () {
                return slide.open ? slide.up() : slide.down();
            };

            slide.btn.addEventListener('click', slide.toggle);
        });
    }
