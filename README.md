# Unscripted Extensible Markup Language

**`UXML`** a lightweight, script-free component library designed for web development within HTML. UXML simplifies the creation of interactive web applications without the need for complex JavaScript frameworks. With UXML, you can create dynamic web components effortlessly, offering a simplified development experience.

<p align="center">
  <img width="100%" height="100%" src="https://github.com/mackignacio/uxml/blob/main/banner.png">
</p>

## Features

- **Script-Free HTML**
    USML enables the creation of dynamic web content directly within HTML, eliminating the need for inline JavaScript.
- **Simplified Interactivity**
    Easily add interactive features to your web pages using HTML attributes and minimal configuration.
- **Cross-Browser Compatibility**
    USML is compatible with modern web browsers, ensuring a consistent user experience.
- **Lightweight**
    USML is incredibly lightweight, weighing in **`20 times less`** size than popular libraries like ReactJS.
- **No Virtual DOM**
    USML doesn't rely on a virtual DOM. This results in a more efficient and simplified rendering process.
- **Shallow Learning Curve**
    USML offers a shallow learning curve, making it accessible to developers of all skill levels. If you know **HTML**, you can start using USML right away.

## Getting Started

1. Include the UXML library in your HTML document:

    ```html
    <script src="https://unpkg.com/uxml@0.1.0-beta.0/uxml.js"></script>
    ```

2. Use UXML attributes within your HTML elements to add interactivity:

    ```html
    <body $load="get:/pages" $swap="innerHTML">
        <!-- Your HTML body -->
    </body>
    ```

## Basic

UXML uses a simple syntax **`$action="event:selector"`** similar on how we do a basic `onclick="click()"` event handler in plain HTML. This is consist of three(**3**) parts, a *declaration* **`$action`**, an *assignment* **`=`** and a *handler* **`"event:selector"`**.

- A **`$`** sign to define/access `USML` inspired by [jquery](https://jquery.com/)
- A **`action`** to be performed on the element inspired by [angularjs](https://angularjs.org/)
- A **`event`** to emit an `USMLEvent` or trigger an `http` request inspired by [htmx](https://htmx.org/)
- A **`:`** to separate **event** and **selector**
- A **`selector`** to "**query**" HTML elements or "**value**" of a given event i.e. `url` for http request

## Usage

UXML provides a range of attributes to enhance interactivity, such as `$click`, `$submit`, `$load`, `$component` and more. These attributes allow you to define behaviors without the need for JavaScript code.

```html
<button $click="show:#hello">Show message!</button>
<div id="hello">Hello, UXML!</div>
```

## Contributions

We welcome contributions from the community to improve UXML. If you encounter issues, have ideas for enhancements, or would like to contribute to the project, please visit our GitHub repository.

## License

UXML is distributed under the MIT License. Feel free to use, modify, and distribute this library in your projects.

## Acknowledgments

UXML stands on the shoulders of giants, drawing inspiration from [jquery](https://jquery.com/), [htmx](https://htmx.org/), [angularjs](https://angularjs.org/) and the need for cleaner more maintainable web code. Their pioneering work has illuminated our path, empowering us to reach new heights in our mission. We thank the open-source community for their contributions and support in making this project possible.
