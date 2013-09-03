"use strict";

//Requires Raphael JS
if ( typeof Raphael === "undefined" || !Raphael) {
    throw "ERROR: Raphael JS is required for fi.fmi.metoclient.ui.animator.AnimationControl!";
}

//"Package" definitions
var fi = fi || {};
fi.fmi = fi.fmi || {};
fi.fmi.metoclient = fi.fmi.metoclient || {};
fi.fmi.metoclient.ui = fi.fmi.metoclient.ui || {};
fi.fmi.metoclient.ui.animator = fi.fmi.metoclient.ui.animator || {};

/**
 * Controller povides time slider to control animations.
 */
fi.fmi.metoclient.ui.animator.Controller = (function() {

    var _labelFontFamily = "Arial";
    var _labelFontSize = 12;

    function getTimeStr(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var timeStr = hours > 9 ? hours : "0" + hours;
        timeStr += ":";
        timeStr += minutes > 9 ? minutes : "0" + minutes;
        return timeStr;
    }

    /**
     * Constructor that is provided from this class for public instantiation.
     *
     * @param {Object} element
     * @param {Object} width
     * @param {Object} height
     */
    var _constructor = function(element, width, height) {
        var that = this;
        var _paper = new Raphael(element, width, height);
        var _model;
        var _timeController;

        // Initialization configurations.
        var _scaleConfig = {
            // Corner radius.
            radius : 5,
            x : 0,
            y : 0,
            width : width,
            height : height - 35,
            bgColor : Raphael.rgb(88, 88, 88),
            cellReadyColor : Raphael.rgb(148, 191, 119),
            cellErrorColor : Raphael.rgb(154, 37, 0),
            cellLoadingColor : Raphael.rgb(148, 191, 191),
            strokeBgColor : Raphael.rgb(191, 191, 191),
            obsBgColor : Raphael.rgb(178, 216, 234),
            fctBgColor : Raphael.rgb(231, 166, 78)
        };
        _scaleConfig.bgHeight = Math.floor(2 * _scaleConfig.height / 3);
        // Make progress cell height a little bit smaller than remaining area.
        // Then, background color is shown a little bit in behind.
        _scaleConfig.progressCellHeight = _scaleConfig.height - _scaleConfig.bgHeight - 2;

        var _sliderConfig = {
            height : 30,
            width : 65,
            bgColor : Raphael.rgb(88, 88, 88),
            strokeBgColor : Raphael.rgb(191, 191, 191)
        };
        // Notice, that polygon is drawn by using path. See, _sliderBg variable.
        // Notice, the polygon path height is 7 and tip height is 3. Therefore, use corresponding ration here.
        _sliderConfig.sliderTipHeight = _sliderConfig.height * (3 / 7);
        // Polygon path width is 14. Scale to the width given here.
        _sliderConfig.scaleX = _sliderConfig.width / 14;
        _sliderConfig.scaleY = (_sliderConfig.height + _sliderConfig.sliderTipHeight) / 7;
        // The tip x position is 4 in the plygon path. So, use that with the scale.
        _sliderConfig.sliderTipDx = Math.floor(4 * _sliderConfig.scaleX);
        // Make slider overlap the scale a little bit.
        _sliderConfig.y = _scaleConfig.y + _scaleConfig.height - Math.floor(_sliderConfig.sliderTipHeight / 3);

        // Scale functions that are required for scale initializations.
        //-------------------------------------------------------------

        /**
         * This is required to make sure slider is not hidden when it is in the side.
         * This happends if it is outside of the paper. Therefore, use padding that
         * takes this into account.
         */
        function getScalePadding() {
            // Notice, exact value can be calculated by _sliderConfig.width - _sliderConfig.sliderTipDx.
            // But it may be better to use constant. Then, for example UI CSS desing may be easier to do if
            // values are constants.
            return 50;
        }

        function nextFrame() {
            _timeController.proposeNextFrame();
        }

        function previousFrame() {
            _timeController.proposePreviousFrame();
        }

        // Handle mouse scroll event.
        function handleMouseScroll(e) {
            if (e.originalEvent.wheelDelta > 0) {
                // Scrolling up.
                nextFrame();

            } else {
                // Scrolling down.
                previousFrame();
            }
            // Prevent scrolling of the page.
            e.preventDefault();
        }

        function getObsWidth() {
            var width = 0;
            if (getForecastStartTime()) {
                // Forecast start time is given. So, calculate the width.
                width = _model && Math.floor((getEndTime() - getStartTime()) ? getScaleAreaWidth() * (getForecastStartTime() - getStartTime()) / (getEndTime() - getStartTime()) : 0);

            } else {
                // Observation takes the whole scale width if forecast is not used.
                width = getScaleAreaWidth();
            }
            if (width < 0) {
                width = 0;
            }
            return width;
        }

        function getFctWidth() {
            var width = _model ? getScaleAreaWidth() - getObsWidth() : 0;
            if (width < 0) {
                width = 0;
            }
            return width;
        }

        /**
         * @return X relative to the window.
         */
        function getScaleAreaOffsetX() {
            return jQuery(_scaleContainer.node).offset().left + getScalePadding();
        }

        // Scale initializations.
        //-----------------------

        // Scale variables.
        // Collection of scale tick elements.
        var _tickSet = _paper.set();
        // Colleciton of progress cell elements.
        var _progressCellSet = _paper.set();

        // Create scale UI components.
        // Scale container is used in the background of the scale elements.
        // Its purpose is just to provide information about the area and its position.
        var _scaleContainer = _paper.rect(_scaleConfig.x, _scaleConfig.y, _scaleConfig.width, _scaleConfig.height, _scaleConfig.radius);
        _scaleContainer.attr('fill', _scaleConfig.bgColor);
        _scaleContainer.attr('stroke', _scaleConfig.strokeBgColor);
        // Keep it hidden in the background.
        _scaleContainer.attr('opacity', 0);

        // Background behind obs and fct.
        var _background = _paper.rect(_scaleConfig.x + getScalePadding(), _scaleConfig.y, getObsWidth() + getFctWidth(), _scaleConfig.height);
        _background.attr('fill', _scaleConfig.bgColor);
        _background.attr('stroke-width', 0);

        var _obsBackground = _paper.rect(_scaleConfig.x + getScalePadding(), _scaleConfig.y, getObsWidth(), _scaleConfig.bgHeight);
        _obsBackground.attr('fill', _scaleConfig.obsBgColor);
        _obsBackground.attr('stroke-width', 0);

        var _fctBackground = _paper.rect(_scaleConfig.x + getScalePadding() + getObsWidth(), _scaleConfig.y, getFctWidth(), _scaleConfig.bgHeight);
        _fctBackground.attr('fill', _scaleConfig.fctBgColor);
        _fctBackground.attr('stroke-width', 0);

        var _leftHotSpot = _paper.rect(_scaleConfig.x + getScalePadding(), _scaleConfig.y, getScalePadding(), _scaleConfig.height);
        // Fill is required. Otherwise, click does not work.
        _leftHotSpot.attr('fill', Raphael.rgb(0, 0, 0)).attr('opacity', 0);
        _leftHotSpot.click(previousFrame);

        var _rightHotSpot = _paper.rect(_scaleConfig.x + width - 2 * getScalePadding(), _scaleConfig.y, getScalePadding(), _scaleConfig.height);
        // Fill is required. Otherwise, click does not work.
        _rightHotSpot.attr('fill', Raphael.rgb(0, 0, 0)).attr('opacity', 0);
        _rightHotSpot.click(nextFrame);

        // Handle mouse wheel over the scale.
        jQuery([_scaleContainer.node, _background.node, _obsBackground.node, _fctBackground.node, _leftHotSpot.node, _rightHotSpot.node]).bind('mousewheel', handleMouseScroll);

        // Slider functions that are required for slider initializations.
        //---------------------------------------------------------------

        /**
         * Set label text according to the position of the slider.
         */
        function resetSliderLabelText() {
            var x = jQuery(_sliderBg.node).offset().left;
            var date = new Date(timeToResolution(posToTime(x)));
            _sliderLabel.attr('text', getTimeStr(date));
        }

        /**
         * @param {Integer} x X position relative to the window origin.
         *                    Notice, x should refere to new x position of the
         *                    left side of slider.
         */
        function moveSliderTo(x) {
            var delta = x - jQuery(_sliderBg.node).offset().left;
            var newTipX = x + _sliderConfig.sliderTipDx;
            var scaleX = getScaleAreaOffsetX();
            if (delta && newTipX >= scaleX && newTipX <= scaleX + getScaleAreaWidth()) {
                _slider.transform("...T" + delta + ",0");
                resetSliderLabelText();
                resetHotSpots();
            }
        }

        // Slider drag flow callback functions are required for slider initializations.
        //-----------------------------------------------------------------------------

        /**
         * @param x X position of the mouse.
         * @param y Y position of the mouse.
         * @param event DOM event object.
         */
        function startDragMove(x, y, event) {
            _timeController.proposePause();
            _dragStartX = jQuery(_sliderBg.node).offset().left;
        }

        /**
         * @param dx shift by x from the start point
         * @param dy shift by y from the start point
         * @param x X position of the mouse.
         * @param y Y position of the mouse.
         * @param event DOM event object.
         */
        function dragMove(dx, dy, x, y, event) {
            // Notice, the given x is the position of the mouse,
            // not the exact position of the left side of the slider.
            // Also, dx is relative to the drag start position, not
            // to the previous  movement.
            var newTime = posToTime(_dragStartX + dx);
            _timeController.proposeTimeSelectionChange(newTime);
        }

        /**
         * @param event DOM event object.
         */
        function finalizeDragMove(event) {
            _dragStartX = undefined;
        }

        // Slider initalizations.
        //-----------------------

        // Collects all the slider elements.
        var _slider = _paper.set();
        // This is updated when slider is dragged.
        var _dragStartX;

        //polygon:
        var _sliderBg = _paper.path("M0,2L0,7L14,7L14,2L6,2L4,0L2,2Z");
        _sliderBg.attr('fill', _sliderConfig.bgColor);
        _sliderBg.attr('stroke', _sliderConfig.strokeBgColor);
        _sliderBg.transform("S" + _sliderConfig.scaleX + "," + _sliderConfig.scaleY + ",0,0T0," + _sliderConfig.y);

        var _sliderLabel = _paper.text(32, _sliderConfig.y + 26, "00:00").attr("text-anchor", "start").attr("font-family", _labelFontFamily).attr("font-size", _labelFontSize).attr("fill", Raphael.rgb(191, 191, 191));

        _slider.push(_sliderBg);
        _slider.push(_sliderLabel);

        // Set drag handlers.
        _slider.drag(dragMove, startDragMove, finalizeDragMove, this, this, this);

        // Reset initial time for label.
        resetSliderLabelText();

        // Handle mouse wheel over the slider.
        jQuery([_sliderBg.node, _sliderLabel.node]).bind('mousewheel', handleMouseScroll);

        // Move slider to the initial position.
        // Notice, because this is the first move, use also _sliderConfig.sliderTipDx to set tip position to the beginning.
        // Otherwise, left side should be given.
        moveSliderTo(getScaleAreaOffsetX() - _sliderConfig.sliderTipDx);

        // Private functions.
        //-------------------

        // Redraw scale and slider elements.
        function redrawAll() {
            redrawScaleBackground();
            redrawTimeCells();
            redrawTics();
            redrawSlider();
            resetHotSpots();
            // Make sure hot spots are in front.
            _leftHotSpot.toFront();
            _rightHotSpot.toFront();
        }

        function resetHotSpots() {
            var sliderTipOffsetX = jQuery(_sliderBg.node).offset().left + _sliderConfig.sliderTipDx;
            // Left hot spot always starts from the same place. Only length changes.
            // Left hot spot width is to the position of the slider tip.
            var leftWidth = sliderTipOffsetX - jQuery(_background.node).offset().left;
            if (leftWidth < 0) {
                leftWidth = 0;
            }
            _leftHotSpot.attr("width", leftWidth);

            // Right hot spot position and width change when slider moves.
            var rightWidth = _background.attr("width") - leftWidth;
            if (rightWidth < 0) {
                rightWidth = 0;
            }
            _rightHotSpot.attr("x", _leftHotSpot.attr("x") + leftWidth).attr("width", rightWidth);
        }

        // Private slider functions.
        //--------------------------

        function redrawSlider() {
            _slider.toFront();
            resetSliderLabelText();
        }

        // Position and time converted functions for slider.
        //--------------------------------------------------

        /**
         * Change time to the resolution time.
         *
         * Scaling and movement of elements may not provide exact times that correspond
         * resolution times. This ties to fix the value if it is not even to resolution.
         */
        function timeToResolution(time) {
            var resolution = getResolution();
            if (time !== undefined && time !== null && resolution) {
                // Use a little bit of a magic value here.
                // The time may be a little bit below correct value because of
                // position and scaling roundings. By adding a small time here
                // the time may increase just enough to create correct result
                // after flooring.
                time += Math.floor(resolution / 4);
                time -= time % resolution;
            }
            return time;
        }

        /**
         * @param {Integer} x X position of the left side of the slider relative to window origin.
         * @return {Integer} Time corresponding to the left side of the slider.
         */
        function posToTime(x) {
            // Container may not be located to the origin of the window.
            // Therefore, take the correct position into account.
            // Also notice, correct time should be identified by the tip position.
            var sliderOffset = getScaleAreaOffsetX() - _sliderConfig.sliderTipDx;
            var time = Math.floor(getStartTime() + ((x - sliderOffset) * getTimeScale()));
            if (time < getStartTime()) {
                time = getStartTime();

            } else if (time > getEndTime()) {
                time = getEndTime();
            }
            return time;
        }

        /**
         * @param {Integer} time Time in milliseconds.
         * @return {Integer} X position of the left side of the slider corresponding to the given time.
         */
        function timeToPos(time) {
            // Container may not be located to the origin of the window.
            // Also notice, correct time should be identified by the tip position.
            var sliderOffset = getScaleAreaOffsetX() - _sliderConfig.sliderTipDx;
            var deltaT = time - getStartTime();
            var timeScale = getTimeScale();
            var position = Math.floor(sliderOffset + ( timeScale ? deltaT / timeScale : 0 ));
            return position;
        }

        // Private scale functions.
        //-------------------------

        function redrawScaleBackground() {
            var obsWidth = getObsWidth();
            var fctWidth = getFctWidth();
            var bgWidth = obsWidth + fctWidth;
            _background.attr("x", _scaleConfig.x + getScalePadding()).attr("width", bgWidth);
            _obsBackground.attr("x", _scaleConfig.x + getScalePadding()).attr("width", obsWidth);
            _fctBackground.attr("x", _scaleConfig.x + getScalePadding() + obsWidth).attr("width", fctWidth);
        }

        /**
         * @param {Integer} x X position of the left side of the slider relative to parent origin, not necessary window.
         * @return {Integer} Time corresponding to the left side of the slider.
         */
        function scalePosToTime(x) {
            var time = Math.floor(getStartTime() + x * getTimeScale());
            if (time < getStartTime()) {
                time = getStartTime();

            } else if (time > getEndTime()) {
                time = getEndTime();
            }
            return time;
        }

        function redrawTimeCells() {
            while (_progressCellSet.length) {
                _progressCellSet.splice(0, 1)[0].remove();
            }
            var resolution = getResolution();
            if (resolution) {
                var begin = getStartTime();
                var end = getEndTime();
                var beginX = getScaleAreaX();
                var beginY = getScaleAreaY() + getScaleAreaHeight() - _scaleConfig.progressCellHeight - 1;
                var cellCount = Math.floor((end - begin) / resolution);
                var cellWidth = getScaleAreaWidth() / cellCount;
                for (var i = 0; i < cellCount; ++i) {
                    var cell = _paper.rect(beginX + i * cellWidth, beginY, cellWidth, _scaleConfig.progressCellHeight);
                    cell.attr("fill", _scaleConfig.bgColor).attr("stroke-width", "0");
                    // Notice, cell ID actually describes the time value in the end of the cell instead of the beginning.
                    // Therefore (i+1) is used. Then, when cell content is loaded, the cell that ends to the selected time
                    // is handled instead of handling cell ahead of the time.
                    cell.node.id = "animationProgressCell_" + (begin + (i + 1) * resolution);
                    _progressCellSet.push(cell);
                    jQuery(cell.node).bind('mousewheel', handleMouseScroll);
                }
            }
        }

        function getCellByTime(time) {
            var cell;
            for (var i = 0; i < _progressCellSet.length; ++i) {
                if (_progressCellSet[i].node.id === "animationProgressCell_" + time) {
                    cell = _progressCellSet[i];
                    cell.attr("fill", _scaleConfig.cellReadyColor);
                    break;
                }
            }
            return cell;
        }

        /**
         * Ticks and major tick labels.
         */
        function redrawTics() {
            while (_tickSet.length) {
                _tickSet.splice(0, 1)[0].remove();
            }
            var resolution = getResolution();
            if (resolution) {
                var begin = getStartTime();
                var end = getEndTime();
                var beginX = getScaleAreaX();
                var cellCount = Math.floor((end - begin) / resolution);
                var cellWidth = getScaleAreaWidth() / cellCount;
                var previousHours;
                for (var i = 0; i <= cellCount; ++i) {
                    var positionX = beginX + i * cellWidth;
                    var date = new Date(begin + i * resolution);
                    // Minor tick height as default.
                    var tickEndY = getScaleAreaHeight() - (_scaleConfig.height - _scaleConfig.bgHeight);
                    var newHour = date.getMinutes() === 0 && date.getSeconds() === 0 && date.getMilliseconds() === 0;
                    if (newHour || i === 0 || i === cellCount) {
                        // Exact hour, major tick.
                        tickEndY = getScaleAreaHeight() / 4;
                    }

                    if (tickEndY) {
                        var beginY = getScaleAreaY() + getScaleAreaHeight();
                        var tick = _paper.path("M" + positionX + "," + beginY + "V" + tickEndY);
                        tick.attr("stroke", Raphael.getRGB("white")).attr("opacity", 0.5);
                        _tickSet.push(tick);
                        jQuery(tick.node).bind('mousewheel', handleMouseScroll);
                        if (newHour && i < cellCount) {
                            var hourLabel = _paper.text(positionX + 2, getScaleAreaY() + 8, getTimeStr(date)).attr("text-anchor", "start").attr("font-family", _labelFontFamily).attr("font-size", _labelFontSize).attr("fill", Raphael.getRGB("black"));
                            // Check if the hourlabel fits into the scale area.
                            var hourLabelNode = jQuery(hourLabel.node);
                            if (hourLabelNode.offset().left + hourLabelNode.width() <= getScaleAreaOffsetX() + getScaleAreaWidth()) {
                                // Label fits. So, let it be in the UI.
                                _tickSet.push(hourLabel);
                                jQuery(hourLabel.node).bind('mousewheel', handleMouseScroll);

                            } else {
                                // Remove hour label because it overlaps the border.
                                hourLabel.remove();
                            }
                        }
                    }
                    previousHours = date.getHours();
                }
            }
        }

        /**
         * Common function for events that should clear cell color to default.
         */
        function progressCellColorToDefault(event) {
            var items = event.events;
            for (var i = 0; i < items.length; ++i) {
                var time = items[i].time.getTime();
                var cell = getCellByTime(time);
                if (cell) {
                    cell.attr("fill", _scaleConfig.bgColor);
                }
            }
        }

        // Animation event listener callbacks.
        //-----------------------------------
        function loadAnimationStartedCb(event) {
            progressCellColorToDefault(event);
        }

        function loadFrameStartedCb(event) {
            var items = event.events;
            for (var i = 0; i < items.length; ++i) {
                var time = items[i].time.getTime();
                var cell = getCellByTime(time);
                if (cell) {
                    cell.attr("fill", items[i].error ? _scaleConfig.cellErrorColor : _scaleConfig.cellLoadingColor);
                }
            }
        }

        function loadFrameCompleteCb(event) {
            var items = event.events;
            for (var i = 0; i < items.length; ++i) {
                var time = items[i].time.getTime();
                var cell = getCellByTime(time);
                if (cell) {
                    cell.attr("fill", items[i].error ? _scaleConfig.cellErrorColor : _scaleConfig.cellReadyColor);
                }
            }
        }

        function loadGroupProgressCb(event) {
            // No need to do anything here because frames are handled item by item
            // in loadFrameCompleteCb above.
        }

        function loadCompleteCb(event) {
            // No need to do anything here because items are handled already separately.
        }

        function animationFrameContentReleasedCb(event) {
            progressCellColorToDefault(event);
        }

        function frameChangedCb(event) {
            var items = event.events;
            for (var i = 0; i < items.length; ++i) {
                var time = items[i].time.getTime();
                // Propose change to controller which will direct change to slider.
                moveSliderTo(timeToPos(time));
            }
        }

        function getForecastStartTime() {
            return _model ? _model.getForecastStartTime() : 0;
        }

        function getStartTime() {
            return _model ? _model.getStartTime() : 0;
        }

        function getEndTime() {
            return _model ? _model.getEndTime() : 0;
        }

        function getResolution() {
            return _model ? _model.getResolution() : 0;
        }

        /**
         * @return X relative to the parent, not necessary a window.
         */
        function getScaleAreaX() {
            return _scaleContainer.getBBox().x + getScalePadding();
        }

        /**
         * @return Y relative to the parent, not necessary a window.
         */
        function getScaleAreaY() {
            return _scaleContainer.getBBox().y;
        }

        function getScaleAreaWidth() {
            return Math.floor(_scaleConfig.width - 2 * getScalePadding());
        }

        function getScaleAreaHeight() {
            return Math.floor(_scaleContainer.getBBox().height);
        }

        function getTimeScale() {
            return _model && getScaleAreaWidth() ? (_model.getEndTime() - _model.getStartTime()) / getScaleAreaWidth() : 1;
        }

        // Public functions.
        //------------------

        /**
         * See API for description.
         */
        function setTimeModel(model) {
            _model = model;
            model.addTimePeriodChangeListener({
                timePeriodChanged : function(start, end) {
                    redrawAll();
                }
            });

            model.addTimeSelectionChangeListener({
                selectedTimeChanged : function(time) {
                    moveSliderTo(timeToPos(time));
                }
            });

            model.addForecastStartTimeChangeListener({
                forecastStartTimeChanged : function(time) {
                    redrawScaleBackground();
                }
            });

            model.addAnimationEventsListener({
                loadAnimationStartedCb : loadAnimationStartedCb,
                loadFrameStartedCb : loadFrameStartedCb,
                loadFrameCompleteCb : loadFrameCompleteCb,
                loadGroupProgressCb : loadGroupProgressCb,
                loadCompleteCb : loadCompleteCb,
                animationFrameContentReleasedCb : animationFrameContentReleasedCb,
                frameChangedCb : frameChangedCb
            });

            redrawAll();
        }

        /**
         * See API for description.
         */
        function setTimeController(controller) {
            _timeController = controller;
        }

        /**
         * See API for description.
         */
        function remove() {
            _paper.remove();
        }

        // Public API functions
        //======================

        /**
         * Set time model that contains actual information data and listener functions
         * for the slider.
         *
         * @param {Object} model
         */
        this.setTimeModel = setTimeModel;

        /**
         * Set controller.
         *
         * @param {Object} controller
         */
        this.setTimeController = setTimeController;

        /**
         * Remove controller from DOM.
         */
        this.remove = remove;
    };

    return _constructor;
})();