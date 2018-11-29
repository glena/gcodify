# GCODify

This tool parses an image and generates a GCODE file ready to be used to laser engrave with a 3d printer

## Usage

```
Usage: index [options] <file>

Options:
  -V, --version               output the version number
  -z, --z-offset [value]      Position for the Z axis in mm. Defaults to 90mm.
  -x, --x-offset [value]      Position for the X axis in mm. Defaults to 35mm.
  -y, --y-offset [value]      Position for the Y axis in mm. Defaults to 35mm.
  -w, --width [value]         Resizes the image by its width in mm (height will be automatically computed if not provided).
  -h, --height [value]        Resizes the image by its height in mm (width will be automatically computed if not provided).
  -p, --precission [value]    Laser beam size. Defaults to 0.01mm.
  --laser-on-code [value]     GCODE to turn laser ON. Defaults to M106.
  --laser-off-code [value]    GCODE to turn laser OFF. Defaults to M107.
  -s, --laser-speed [value]   Speed for the movements while engraving. Defaults to 40 mm/s.
  -t, --travel-speed [value]  Speed for the movements while traveling. Defaults to 200 mm/s.
  -h, --help                  output usage information
```
