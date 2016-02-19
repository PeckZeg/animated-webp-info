const child_process = require('child_process');
const util = require('util');
const _ = require('lodash');

const CANVAS_SIZE_PATTERN = /canvas\s+size:\s+(\d+)\s+x\s+(\d+)/i;
const FEATURES_PRESENT_PATTERN = /features\s+present:\s+(\w+)/i;
const BG_COLOR_LOOP_COUNT_PATTERN = /background\s+color\s+:\s+([\d\w]+)\s+loop\s+count\s+:\s+(\d+)/i;
const NUMBER_OF_FRAMES = /number\s+of\s+frames:\s+(\d+)/;

module.exports = (src, cb) => {
    var cmd = util.format('webpmux -info %s', src);

    child_process.exec(cmd, (err, stdout, stderr) => {
        if (err) return cb(err);
        if (!stdout) return cb(null, {});

        var frameAttrs;

        var info = _.reduce(stdout.split(/\r\n/), (info, value) => {
            var txt = _.trim(value),
                canvasSize = CANVAS_SIZE_PATTERN.exec(txt),
                featuresPresent = FEATURES_PRESENT_PATTERN.exec(txt),
                bgColorAndLoopCount = BG_COLOR_LOOP_COUNT_PATTERN.exec(txt),
                numberOfFrames = NUMBER_OF_FRAMES.exec(txt);

            if (canvasSize) {
                info.width = parseInt(canvasSize[1]);
                info.height = parseInt(canvasSize[2]);
            }

            if (featuresPresent) {
                _.set(info, 'webp.featuresPresent', featuresPresent[1]);
            }

            if (bgColorAndLoopCount) {
                _.set(info, 'webp.bgColor', bgColorAndLoopCount[1]);
                _.set(info, 'webp.loopCount', parseInt(bgColorAndLoopCount[2]));
            }

            if (numberOfFrames) {
                _.set(info, 'webp.numberOfFrames', parseInt(numberOfFrames[1]));
            }

            var frames = txt.split(/\s+/);

            if (frames.length == 10) {
                if (frames[0] == 'No.:') {
                    frameAttrs = frames;
                    frameAttrs[0] = 'No';
                }

                else {
                    info.webp = info.webp || {};
                    info.webp.frames = info.webp.frames || [];
                    info.webp.frames.push(frames);
                }

            }

            return info;
        }, {});

        var frames = _.get(info, 'webp.frames');

        if (frames) {
            frames = _.map(frames, (values) => {
                return _.chain(frameAttrs).zipObject(values).mapValues((value) => {
                    var number = /(\d+):/i.exec(value);
                    if (number) value = number[1];
                    return isNaN(parseInt(value)) ? value : parseInt(value);
                }).value();
            });

            var duration = _.reduce(frames, (duration, frame) => {
                return Math.min(Infinity, frame.duration);
            }, 0);

            _.set(info, 'webp.frames', frames);
            _.set(info, 'webp.duration', duration);
        }

        cb(null, info);
    });
};