# Unscripted eXtended Markup Language (UXML)

<p align="center">
  <img width="100%" height="100%" src="https://github.com/mackignacio/uxml/blob/main/banner.png">
</p>

**`UXML`** a lightweight, script-free component library designed specifically for web development within HTML. Whether you're a seasoned developer or new to web development, UXML simplifies the creation of interactive web applications without the need for complex JavaScript frameworks. You can create dynamic web components effortlessly without the need for any JavaScript code. With UXML, you can enhance user interfaces, handle user interactions, and build feature-rich web applications while working within the familiar HTML structure.

## Features

- **Script-Free HTML**
  UXML enables the creation of dynamic web content directly within HTML, eliminating the need for inline JavaScript.
- **Simplified Interactivity**
  Easily add interactive features to your web pages using HTML attributes and minimal configuration.
- **Cross-Browser Compatibility**
  UXML is compatible with modern web browsers, ensuring a consistent user experience.
- **Lightweight**
  UXML is incredibly lightweight, weighing in **`20 times less`** size than popular libraries like ReactJS.
- **No Virtual DOM**
  UXML doesn't rely on a virtual DOM. This results in a more efficient and simplified rendering process.
- **Shallow Learning Curve**
  UXML offers a shallow learning curve, making it accessible to developers of all skill levels. If you know **HTML**, you can start using UXML right away.

## Getting Started

1. Include the UXML library in your HTML document:

   ```html
   <script src="https://unpkg.com/uxml.js@0.1.0/uxml.js"></script>
   ```

2. Use UXML attributes within your HTML elements to add interactivity:

   ```html
   <body $load="get:/pages" $swap="innerHTML">
     <!-- Your HTML body -->
   </body>
   ```

## Basic

UXML uses a simple syntax **`$action="event:selector"`** similar on how we do a basic `onclick="click()"` event handler in plain HTML. This is consist of three(**3**) parts, a _declaration_ **`$action`**, an _assignment_ **`=`** and a _handler_ **`"event:selector"`**.

- A **`$`** sign to define/access `UXML` inspired by [jquery](https://jquery.com/)
- A **`action`** to be performed on the element inspired by [angularjs](https://angularjs.org/)
- A **`event`** to emit an `UXMLEvent` or trigger an `http` request inspired by [htmx](https://htmx.org/)
- A **`:`** to separate **event** and **selector**
- A **`selector`** to "**query**" HTML elements or "**value**" of a given event i.e. `url` for http request

## Usage

UXML provides a range of attributes to enhance interactivity, such as `$click`, `$submit`, `$load`, `$component` and more. These attributes allow you to define behaviors without the need for JavaScript code.

```html
<button $click="show:#hello">Show message!</button>
<div id="hello">Hello, UXML!</div>
```

## Contributions

We welcome contributions from the community to improve UXML. If you have ideas for improvements or encounter any issues, please consider opening an issue or submitting a pull request on our **[GitHub repository](https://github.com/mackignacio/uxml/issues)**.

## License

UXML is distributed under the MIT License. Feel free to use, modify, and distribute this library in your projects.

## Acknowledgments

UXML stands on the shoulders of giants, drawing inspiration from [jquery](https://jquery.com/), [htmx](https://htmx.org/), [angularjs](https://angularjs.org/) and the need for more simplified, cleaner, and maintainable web code. Their pioneering work has illuminated our path, empowering us to develop this project. We thank the open-source community for their contributions and support in making this project possible.
