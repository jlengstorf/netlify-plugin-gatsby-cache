# Netlify Build Plugin: Persist the Gatsby Cache Between Builds

NOTE: Netlify Build Plugins are in beta. [To use this plugin, request an invite!](https://www.netlify.com/build/plugins-beta/?utm_source=github&utm_medium=netlify-plugin-gatsby-cache-jl&utm_campaign=devex)

Persist the Gatsby cache between Netlify builds for huge build speed improvements!

## Usage

In your `netlify.yml`:

```yml
plugins:
  - type: netlify-plugin-gatsby-cache
```

## Config

If you don’t keep your Gatsby installation at the root of yoru repo (e.g. you’re using workspaces or a subdirectory for your site), you can change the paths to the `.cache` and `public` directories with config options:

```yml
plugins:
  - type: netlify-plugin-gatsby-cache
    config:
      gatsby_public_dir: site/public
      gatsby_cache_dir: site/.cache
```

## Want to learn how to create your own Netlify Build Plugins?

Check out [Sarah Drasner’s excellent tutorial](https://www.netlify.com/blog/2019/10/16/creating-and-using-your-first-netlify-build-plugin/?utm_source=github&utm_medium=netlify-plugin-gatsby-cache-jl&utm_campaign=devex)!
