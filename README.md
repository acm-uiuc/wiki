# ACM@UIUC Static Wiki

Welcome to the repo for the ACM@UIUC wiki! The wiki is live at [wiki.acm.illinois.edu](https://wiki.acm.illinois.edu), so if you are looking to view it you can do so there. If you are looking to contribute to this repo, please follow the instructions below.

## Contributing

### Setup

This website uses [Hugo](https://gohugo.io/) for static site generation. As such, to effectively develop for and test this repo please follow the installation instructions [here](https://gohugo.io/getting-started/installing/).

### Adding/Modifying Content
To add/modify content on the wiki, navigate to `./content/docs/`. This directory structure is turned in to the wiki pages that are displayed. If you are adding a new section, simply create a new subfolder. Make sure that this folder contains a `_index.md` file with the content for the index of that section.

#### Adding Images
To add an image to your page, upload it to the `./resources/_gen/images` folder. If you then want to include it in your wiki page, use the following snippet:
```
{{- $image := resources.Get "images/[IMAGENAME.EXT]" -}}
```
Using this format allows image modifications like resizing. If you want to know more, check out the Hugo documentation.

### Modifying The Website

This repo uses the [hugo-book](https://github.com/alex-shpak/hugo-book) theme, so if you are looking to make stylistic or structural changes, please familiarize yourself with the Hugo and Hugo Book documentations, then make changes as desired.

### Local Testing

To test the website locally, run `hugo server --minify --theme book`. This will create a live server that reacts to your changes.

### Deploying

The repository will automatically rebuild the site any time a change is made to the `master` branch. As such, _please_ work on a separate branch and open a pull requests with your changes so that they can be reviewed before going live.