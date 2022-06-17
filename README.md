# odin_etchAsketch
Creating a basic etch-a-sketch page using javascript originally to the specifications required in the Odin project (https://www.theodinproject.com/lessons/foundations-etch-a-sketch).

Since completing the relevant specifications, I have added several additional features: 

  - The first feature added is the ability to change the pen colour using an rgb colour input. This means that when the event fires, the colour is specified instead of random. This allows the user to create specific images as opposed to simple patterns.
 
  - Next added is the background colour selector using an rgb colour input. This allows the user to focus on the foreground of their image, and fill out the remaining grid spaces using the background colour selector.

  - To temporarily complete the colour controls section, and to aid the user in creating a specific image, I have created an eraser function. This reverts the colour of the grid space to transparent and reveals the background colour of the canvas once again.

All of these functions are aided and selected with the use of a toggle button system, meaning that only one can be active at any one time. In addition to these features, we have now included more controls for the functioning of the canvas itself:

  - The ability to clear all grid spaces and revert them to transparent.

  - The ability to upload an image file and use it as a background, to trace a picture.

Features to work on:

  - The toggle button to enable and disable the current trace background functions correctly, but does not apply specific active button styling.

  - The shading features are not currently implemented.

Initial trace image found at:
https://www.nicepng.com/ourpic/u2q8q8o0a9o0e6a9_dinosaur-png-t-rex-head-transparent-background/