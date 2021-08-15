var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function createElement(type, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    return {
        type: type,
        props: __assign(__assign({}, props), { children: children.map(function (child) { return typeof child === "object" ? child : createTextElement(child); }) })
    };
}
function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    };
}
function render(element, container) {
    var dom = element.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type);
    var isProperty = function (key) { return key !== "children"; };
    Object.keys(element.props).filter(isProperty).forEach(function (name) {
        dom[name] = element.props[name];
    });
    element.props.children.forEach(function (child) { return render(child, dom); });
    container.appendChild(dom);
}
var Veritas = {
    createElement: createElement,
    render: render
};
/** @jsx Veritas.createElement */
var element = {
    type: "h1",
    props: {
        title: "foo",
        children: "Hello"
    }
};
// const container = document.getElementById("app")
// Veritas.render(element, container)
var app = document.getElementById("app");
var p = document.createElement("p");
p.textContent = "Hello, World!";
app === null || app === void 0 ? void 0 : app.appendChild(p);
