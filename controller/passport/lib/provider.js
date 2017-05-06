'use strict'




class providerStrategy {
  constructor(who) {
    this.provider = (who) ? who : null;
  }

  getStrategy(who) {
    if(!who && this.provider === null)
      return false;
  }
}
