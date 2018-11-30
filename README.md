# GCODify

This tool parses an image and generates a GCODE file ready to be used to laser engrave with a 3d printer

## Install

Install NPM is you dont have it: https://www.npmjs.com/get-npm

Install GCODify:

```
$ npm i -g gcodify
```

## Usage

```
Usage: gcodify [options] <file>

Options:
  -V, --version                   output the version number
  -z, --z-offset [value]          Position for the Z axis in mm. Defaults to 90mm.
  -x, --x-offset [value]          Position for the X axis in mm. Defaults to 28mm.
  -y, --y-offset [value]          Position for the Y axis in mm. Defaults to 16mm.
  -w, --width [value]             Resizes the image by its width in mm (height will be automatically computed if not provided).
  -h, --height [value]            Resizes the image by its height in mm (width will be automatically computed if not provided).
  -p, --precision [value]         Laser beam size. Defaults to 0.01mm.
  -lon, --laser-on-code [value]   GCODE to turn laser ON. Defaults to M106.
  -lof, --laser-off-code [value]  GCODE to turn laser OFF. Defaults to M107.
  -s, --laser-speed [value]       Speed for the movements while engraving. Defaults to 10 mm/s.
  -t, --travel-speed [value]      Speed for the movements while traveling. Defaults to 200 mm/s.
  -pt, --pixel-threshold [value]  Threshold where a pixel is identified as black (from 0 to 255). Defaults to 128.
  -b, --image-brighness [value]   Tweaks the image brighness (from -1 to 1)
  -c, --image-contrast [value]    Tweaks the image contrast (from -1 to 1)
  -q, --image-quality [value]     Image quality (from 0 to 100). Defaults to 60.
  -o, --output-filename [value]   Overrides the filename used for the process output. Used for both preview and gcode output.
  --preview                       Will generate an image instead of a GCODE to preview what the CCODE will look like.
  --debug                         Show debug info such as stack traces and debug logs.
  -h, --help                      output usage information
  ```

Example: 

```
$ gcodify -w 200 ./my_cool_logo.jpg
```