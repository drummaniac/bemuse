---
id: architecture
title: Project Architecture
sidebar_label: Architecture
---

This section describes the architecture of the project.

## Directory Structure

<dl>
  <dt>bin</dt>  
  <dd>Useful scripts for routine work. Examples include setting up Git
  commit hooks and releasing a new version.</dd>

  <dt>config</dt>  
  <dd>Configuration code for webpack and other things.</dd>

  <dt>docs</dt>  
  <dd>This documentation.</dd>

  <dt>public</dt>  
  <dd>Files that will be deployed verbatim to the server, **except for**
  `index.html`, where the boot script will be inlined. These include
  skin files.</dd>

  <dt>spec</dt>  
  <dd>Contains the unit tests. Its directory structure resembles the `src`
  directory.</dd>

  <dt>src</dt>  
  <dd>Contains the production code. Code is split into *modules* for
  different parts of the application.</dd>

  <dt>tasks</dt>  
  <dd>Gulp tasks to run test server, build, test the application.</dd>
</dl>

## Important Modules

These modules live in the `src` directory. There may be an arbitrary
number of modules. Therefore, this section only lists the significant
modules.

<dl>
  <dt>boot</dt>  
  <dd>This module is the entry point to Bemuse. It reads the <code>?mode=</code>
  parameter and determines the name of the main module to load. It
  then displays a loading indicator and loads the main module
  asynchronously. After the main module is downloaded, finally, it is
  executed. Main modules include <code>app</code>, the game, and <code>test</code>, the unit
  tests. Upon building, the boot script will be inlined into
  <code>index.html</code>.
    
  **Rationale:** No one likes blank white page. We want the user to
  see the application starting up as soon as possible, even though it
  is simply a loading indicator. To make this *blazingly fast*, we
  keep the compiled size of the `boot` very small, and inline that
  compiled code directly into the HTML file. So, no round-trip HTML
  requests\! If they can load the HTML, they *will* see the loading
  bar.</dd>

  <dt>app</dt>  
  <dd>This is the main module of the game's application flow. Executing
  this module will present the game's main menu.</dd>

  <dt>test</dt>  
  <dd>This is the main module for unit tests. Executing this module will
  setup the environment for testing, load the unit tests in `spec`
  directory, and then execute them. After the test is run, the results
  and coverage data (if available) will be sent back to the server for
  further processing.</dd>

  <dt>game</dt>  
  <dd>This module contains the actual game part. For example, the logic
  for judging notes, calculating score, and rendering the scene.</dd>
</dl>

## Related Projects

Apart from the `bemuse` project, we also maintain other closely-related
projects in a separate repository.

<dl>
  <dt><a href="https://github.com/bemusic/bms-js">bemusic/bms-js</a></dt>  
  <dd>This project is a BMS parser written in JavaScript. It is written in
    plain ES5 for maximum portability.</dd>

  <dt><a href="https://github.com/bemusic/bmspec">bemusic/bmspec</a></dt>  
  <dd>This project is an executable specification of the BMS file format.
  It is used to make sure that bms-js can properly parse BMS file
  format, especially the edge cases.</dd>

  <dt><a href="https://github.com/bemusic/bemuse-tools">bemusic/bemuse-tools</a></dt>  
  <dd>This repository contains the command-line tools needed to convert a BMS package
  into a Bemuse package. Traditional BMS packages are optimized for
  offline playing. They are distributed as a large <code>.zip</code>
  file with <code>.wav</code>, <code>.mpg</code>, and <code>.bms</code> files.
  This is not suitable for web consumption.</dd>
</dl>
