export const EventBus = {
    events: [],

    on(name, fun) {
        this.events.push({
            name: name,
            fun: fun
        });
    },

    emit(name, param) {
        var event = this.events.find(x => x.name === name)
        if (event) {
            event.fun(param)
        }
    }
}