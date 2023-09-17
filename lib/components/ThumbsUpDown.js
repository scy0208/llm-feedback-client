"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const themes_1 = require("@radix-ui/themes");
const ThumbsUpDown = ({ client, contentId }) => {
    const [score, setScore] = (0, react_1.useState)(0);
    const [comment, setComment] = (0, react_1.useState)('');
    const ThumbsUpSvg = (react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", className: "lucide lucide-thumbs-up" },
        react_1.default.createElement("path", { d: "M7 10v12" }),
        react_1.default.createElement("path", { d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" })));
    const ThumbsDownSvg = (react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", className: "lucide lucide-thumbs-down" },
        react_1.default.createElement("path", { d: "M17 14V2" }),
        react_1.default.createElement("path", { d: "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" })));
    return (react_1.default.createElement(themes_1.Theme, null,
        react_1.default.createElement(themes_1.Popover.Root, null,
            react_1.default.createElement(themes_1.Popover.Trigger, null,
                react_1.default.createElement(themes_1.Button, { size: "2", variant: "outline" },
                    ThumbsUpSvg,
                    ThumbsDownSvg)),
            react_1.default.createElement(themes_1.Popover.Content, { style: { width: 360 } },
                react_1.default.createElement(themes_1.Flex, { gap: "3" },
                    react_1.default.createElement(themes_1.Box, { grow: "1" },
                        react_1.default.createElement(themes_1.TextArea, { placeholder: "Write a comment\u2026", style: { height: 80 }, defaultValue: comment, onChange: (e) => setComment(e.target.value) }),
                        react_1.default.createElement(themes_1.Flex, { gap: "3", mt: "3", justify: "between" },
                            react_1.default.createElement(themes_1.Flex, { align: "center", gap: "2", asChild: true },
                                react_1.default.createElement("label", null,
                                    react_1.default.createElement(themes_1.Button, { size: "2", variant: score === 1 ? "solid" : "outline", onClick: () => setScore(1) }, ThumbsUpSvg),
                                    react_1.default.createElement(themes_1.Button, { size: "1", variant: score === -1 ? "solid" : "outline", onClick: () => setScore(-1) }, ThumbsDownSvg))),
                            react_1.default.createElement(themes_1.Popover.Close, null,
                                react_1.default.createElement(themes_1.Button, { size: "2", onClick: () => {
                                        client.createFeedback({
                                            contentId,
                                            key: 'thumbs-up-down',
                                            score,
                                            comment
                                        });
                                    } }, "Submit")))))))));
};
exports.default = ThumbsUpDown;
