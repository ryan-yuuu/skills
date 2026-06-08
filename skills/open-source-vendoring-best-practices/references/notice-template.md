# Attribution entry templates

Fill one of these in and append it to the project's notices file
(`THIRD_PARTY_LICENSES` / `NOTICE` / etc.). One block per distinct component.

## Generic entry

```
## <component name>

- Source:   https://github.com/<owner>/<repo>
- Version:  <commit SHA or release tag>
- Obtained: <YYYY-MM-DD>
- License:  <SPDX id, e.g. MIT>
- Files:    <path(s) where this lives in our repo>

<full license text — paste verbatim from the source LICENSE file,
including the original copyright line(s)>
```

## MIT example (filled in)

```
## tiny-debounce

- Source:   https://github.com/example/tiny-debounce
- Version:  a1b2c3d
- Obtained: 2026-06-06
- License:  MIT
- Files:    src/util/debounce.ts

MIT License

Copyright (c) 2024 Jane Developer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Apache-2.0 note

Apache-2.0 has two extra obligations beyond preserving the license:

1. If the source repo ships a `NOTICE` file, copy its relevant contents into
   your `NOTICE` file.
2. State significant changes you made to any file (a header comment per modified
   file, or a `CHANGES` note, is sufficient).

## In-file header (when you preserve/add a notice at the top of a copied file)

```
// Source: https://github.com/<owner>/<repo> @ <sha>
// License: <SPDX id> — Copyright (c) <year> <holder>
// Adapted: <YYYY-MM-DD> — <summary of any changes, or "verbatim">
```
