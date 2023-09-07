# UnScript Markup Language

**`USML`** is a lightweight JavaScript library designed to streamline web development by reducing the reliance on embedded JavaScript within HTML files. This library empowers developers to create dynamic and interactive web elements using simple, clean, and script-free HTML markup.

<p align="center">
  <img width="100%" height="100%" src="https://github.com/mackignacio/usml/blob/main/banner.png">
</p>

## Features

- **Script-Free HTML**
    UnScriptML enables the creation of dynamic web content directly within HTML, eliminating the need for inline JavaScript.
- **Simplified Interactivity**
    Easily add interactive features to your web pages using HTML attributes and minimal configuration.
- **Cross-Browser Compatibility**
    UnScriptML is compatible with modern web browsers, ensuring a consistent user experience.
- **Lightweight**
    The library is minimal in size, minimizing the impact on page load times.

## Getting Started

1. Include the USML library in your HTML document:

    ```html
    <script src="usml.js"></script>
    ```

2. Use USML attributes within your HTML elements to add interactivity:

    ```html
    <body $load="get:/pages" $append="innerHTML">
        <!-- Your HTML body -->
    </body>
    ```

## Basic

Basic syntax is **`$action="event:selector"`** similar on how we do a basic **`onclick="click()"`** event in HTML

- A `$` sign to define/access `USML` inspired by [jquery](https://jquery.com/)
- A `action` to be performed on the element
- A `event` a trigger for sending `http` request or emitting a `USMLEvent`
- A `:` to separate **event** and **selector**
- A `selector` to "**query**" HTML elements or "**value**" of a given event i.e. `url` for http request

## Usage

USML provides a range of attributes to enhance interactivity, such as `$click`, `$hover`, `$hide`, `$toggle`, and more. These attributes allow you to define behaviors without the need for JavaScript code.

```html
<button $click="show:#hello">Show message!</button>
<div id="hello">Hello, USML!</div>
```

## Contributions

We welcome contributions from the community to improve USML. If you encounter issues, have ideas for enhancements, or would like to contribute to the project, please visit our GitHub repository.

## License

USML is distributed under the MIT License. Feel free to use, modify, and distribute this library in your projects.

## Acknowledgments

USML is inspired by [jquery](https://jquery.com/), [htmx](https://htmx.org/) and the need for cleaner more maintainable web code. We thank the open-source community for their contributions and support in making this project possible.
