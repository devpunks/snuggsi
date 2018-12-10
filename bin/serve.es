const
  { Server, Resource }
    = require ('..')

, { DIRECTORY: directory }
    = process.env

void (new Server)
  .serve (directory)
