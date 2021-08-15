namespace VeritasFactory {
    const Fragment = "<>< />"

    export function createElement(tagName: string, attributes: JSX.AttributeCollection | null, ...children: any[]): Element | DocumentFragment {
        if (tagName === Fragment) {
            return document.createDocumentFragment()
        }

        const element = document.createElement(tagName)
        if (attributes) {
            for (const key of Object.keys(attributes)) {
                const attributeValue = attributes[key]

                if (key === "className") {
                    element.setAttribute("class", attributeValue)
                } else if (key.startsWith("on") && typeof attributes[key] === "function") {
                    element.addEventListener(key.substring(2), attributeValue)
                } else {
                    if (typeof attributeValue === "boolean" && attributeValue) {
                        element.setAttribute(key, "")
                    } else {
                        element.setAttribute(key, attributeValue)
                    }
                }
            }
        }
        for (const child of children) {
            appendChild(element, child);
        }

        return element;
    }

    function appendChild(parent: Node, child: any) {
        if (typeof child === "undefined" || child === null) {
            return;
        }

        if (Array.isArray(child)) {
            for (const value of child) {
                appendChild(parent, value);
            }
        } else if (typeof child === "string") {
            parent.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            parent.appendChild(child);
        } else if (typeof child === "boolean") {
        } else {
            parent.appendChild(document.createTextNode(String(child)));
        }
    }
}

function createElement(type: any, props: any, ...children: any) {
    return {
        type,
        props: {
            ...props,
            children: children.map((child: any) => typeof child === "object" ? child : createTextElement(child))
        }
    }
}


function createTextElement(text: any) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: [],
        }
    }
}

function render(element: any, container: any) {
    const dom = element.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type)
    const isProperty = (key: string) => key !== "children"
    Object.keys(element.props).filter(isProperty).forEach(name => {
        dom[name] = element.props[name]
    })
    element.props.children.forEach((child: any) => render(child, dom))
    container.appendChild(dom)
}

const Veritas = {
    createElement,
    render
}

/** @jsx Veritas.createElement */
const element = {
    type: "h1",
    props: {
        title: "foo",
        children: "Hello"
    }
}

// const container = document.getElementById("app")
// Veritas.render(element, container)
const app = document.getElementById("app")
const p = document.createElement("p")
p.textContent = "Hello, World!"
app?.appendChild(p)