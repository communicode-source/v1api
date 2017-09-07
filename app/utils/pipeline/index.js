import EventEmitter from 'events';

class Pipeline {

  constructor(key, pipeData, pipeline = '', events = []) {
    this.pipeline = {};
    this.key = key;
    this.emitter = new EventEmitter;

    this.pipeline = {
      'data': pipeData,
      'middleware': {}
    };
  }

  // Do we need this tho ?
  // yes
  handle(addToRequest) {
    this.pipeline.data = Object.assign({}, this.pipeline.data, addToRequest);
    return this;
  }

  through(middleware) {
    const curMiddleware = this.pipeline.middleware;
    for(let eventName in middleware) {
      middleware[eventName] = this.emitter.on(eventName, middleware[eventName]);
    }
    this.pipeline.middleware = Object.assign({}, curMiddleware, middleware);

    return this;
  }

  dispatch(events = []) {
    if(events.length === 0) {
      for(let queue in this.pipeline.middleware) {
        this.emitter.emit(queue, this.pipeline.data);
      }
    } else {
      events.forEach(eventName => {
        this.emitter.emit(eventName, this.pipeline.data);
      });
    }
  }
}

export default Pipeline;
