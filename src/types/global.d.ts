declare module NodeJS {
  interface Global {
    /**
     * Points to the project `src` folder.
     */
    __ROOT__: string
  }
}
