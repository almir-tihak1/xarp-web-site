---
title: "A brief dive into the world of Microfrontends"
date: "2025-09-18"
tags: ["Development"]
excerpt: "INTRO The web boom of the 2010s, when everyone started building and expanding the web with new systems and frameworks, as the code quantity and scope of projects expanded, led to a problem in the…"
cover: "/images/ba3584129235.jpg"
hero: "/images/2fc0c89d9530.jpg"
readingTime: 6
---

**INTRO**

The web boom of the 2010s, when everyone started building and expanding the web with new systems and frameworks, as the code quantity and scope of projects expanded, led to a problem in the world of web development: increasingly large projects required more and more time to build and ship. For the backend side, developers started looking into separating their projects into smaller pieces called microservices. Microservices have revolutionized the backend architecture of many projects, allowing teams to work on parts of their systems and ship smaller chunks of updates more frequently.

However, while the backend development teams enjoyed working on these isolated pieces of the project, another issue arose - the frontend. For the most part, frontend remained one big monolith - a repository filled with hundreds (if not even thousands) of files. Maintaining and adding features to it was a problem in its own right - the same problem that the backend teams faced years earlier. The solution?

Just like with the backend side of the project, the intuition was to think of a way of splitting the frontend into several smaller projects that can be updated, built, and deployed independently. Thus,microfrontends became the trend.

Naturally, it wasn’t without its own set of challenges. Unlike the backend, where APIs and their logic and processes are fairly isolated and can (and should) work without depending on each other, frontends are visible to the end-user and share the same screen: they run in the browser and need consistency to a certain extent in terms of styling, behavior, and even browser compatibility.

Today, there are many resources for microfrontends available, but they often share examples of multiple microfrontends within the same JS framework. Let's take a different approach here and explore "the Frankenstein model" - having a microfrontend system with different JS frameworks. There are a few different approaches to microfrontends today, one of which might come up even as a surprise:

- \<iframe> - the oldest solution in the box, available since the dawn of time; a fully reliable and fully isolated web application embedded right into your project.

* Module Federation - allows JS applications to dynamically import code at runtime, without the need to rebuild the entire application; this enables teams to share entire microfrontends while keeping their deployment independent.

- Native Federation - a newer way to import JS code at runtime, without the need for Webpack (unlike Module Federation) - this means that there's no vendor lock-in when using Native Federation; overall, NF makes microfrontend setups lighter and more future-proof.

* Web Components - a set of standardized browser APIs (in this case, basically custom HTML elements) which allow developers to create encapsulated, reusable UI elements; Web Components are framework agnostic, but they may require polyfills for older browsers.

- Single SPA (not covered by this article) – a route-based microfrontend JS framework, which downloads and executes the code for a route once it becomes active.

Through a template-like example of an Angular application that contains a bunch of microfrontends that I have built, let's take a brief look at how to implement a microfrontend system with an Angular application (often called the "shell", "host", or "app container") that has multiple microfrontends (usually called "remotes"). The example will cover loading a list of available microfrontends (called "apps") based on what is configured in a backend API.

The source code is already available on GitHub for anyone interested.

**Architecture**

- Backend - a tiny Express server that serves a static JSON file containing a list of configured microfrontends.
- Host / Shell - an Angular app with a simple navigation bar that fetches apps from the backend and loads microfrontends using Module Federation, Native Federation, Iframe, and Web Components.
- Remotes:remote-angular-nf - an Angular application configured to act as a microfrontend using Native Federation.remote-angular-mf - an Angular application configured to act as a microfrontend using Module Federation.remote-react-mf - a React application exposed via Module Federation and consumed as a Web Component in the Angular host.remote-angular-iframe - an Angular application served as a fully isolated app, embedded with an \<iframe> HTML tag.

The backend returns a list of configured microfrontends so that the Angular host does not hardcode routes to remotes. The "configured microfrontends" are defined in the apps.json file. The data contract is intentionally left to be flexible so that more apps can be added using different microfrontend technologies.

An example of a configured microfrontend:

\[

{

"id": "angular-nf",

"name": "Angular Native Federation",

"icon": {

"url": "https://...angular-icon.png"

},

"embedMethod": "NativeFederation",

"routing": {

"path": "angular-nf"

},

"remote": {

"entry": "[http://localhost:4201/remoteEntry.json](http://localhost:4201/remoteEntry.json)",

"name": "remote-angular-nf",

"exposedModule": "./routes"

}

}

\]

The **embedMethod** is the key defining property that tells the Angular host whether to try to embed the microfrontend using Module Federation, Native Federation, Iframe, or to treat it as a web component. The **routing.path** property tells the Angular host under which path to have that app loaded in the page - e.g., upon opening **users/top-rated** in the Angular host, that would load the microfrontend and display it on the page.​

**The Flow**

Once started, the Angular host will:

1. Call the backend API to retrieve the apps.json and get a list of configured microfrontends.
1. Then, it will build the Angular router based on that response, as well as the UI navigation menu.
1. Clicking on any menu item in the navigation bar would attempt to load the selected microfrontend

via its defined embed method.

As previously stated, the template-like example provides 4 different embedding approaches already built into it.

**Iframe**

- Use for full isolation or when embedding legacy apps.
- The host renders a lightweight **IframeWrapperComponent** and sets its **src** from the app’s **remote.baseUrl .**
- The downside would be state sharing and cross-app communication, which requires the use of JavaScript's **postMessage** .

**​Module Federation (MF)**

- MF is great for dynamic code loading with shared libraries as well as foreign-framework integration (e.g., like in our case - a React app inside an Angular host with routing support).
- There are tons of resources on how to set it up and use it in various frameworks
- Its downside is that it requires Webpack, which may end up in vendor lock-in.

**Native Federation (NF)**

- NF is basically MF without the vendor lock-in.
- The host can lazy load anything exposed by the remote using **@angulararchitects/native-federation** .
- Being a bit newer, it may not have support for everything and may require shimming in some browsers, but it leverages standard module semantics and is generally lighter than MF.

**Wrapper (Web Components)**

- For non-Angular apps (React, Svelte), the host first ensures the remote is loaded (MF or NF), then creates a custom element and appends it to the DOM.
- Web Components are framework agnostic and often very clean to include, but hooking up to something like component lifecycle methods may be troublesome.
- Web Components can be built using dedicated frameworks like Lit.js.

**Running the demo**

The easiest way would be to open the repository in VS Code, perform **npm install** for all the applications, and then in the **Run and Debug** tab, select **Start all microfrontends + backend** . Alternatively, you can open a terminal per application, install the dependencies, and then run it on your own. Adding a microfrontend is as easy as expanding the backend/apps.json file.

Once all services are running, open [http://localhost:4200](http://localhost:4200) (the Angular host) and switch between apps. The host should pull in the microfrontends and display them in runtime on demand.

**Verdict**

This was created because none of the online resources that I looked for were displaying how to set up an Angular host with a React microfrontend. Those that did have a React microfrontend wouldn't use the React router at all, and instead, they just had a static React component embedded.

In other words, this setup was sort of built to try and mix different microfrontend approaches so that the development team can easily switch and decide whether their microfrontend can be included using an iframe or something else. Upon a frontend update, in case something breaks, they can easily switch from Native Federation to Iframe, for example, and then proceed as usual. From this point onwards, you could introduce authentication, some event handling, cross-app styling by importing CSS in the host and then reusing it in the microfrontends, and much more to polish both the UI and UX.​
