function define(name, value) {
    Object.defineProperty(exports, name, {
        value : value,
    });
}

// Statuses
define("status", {
    active: {
        value: 1,
        caption: "Active",
    },
    inactive: {
        value: 0,
        caption: "Inactive",
    },
});
//---------------------------

//Variables
define("variables", {
    ACTIVE : "Active",
    INACTIVE: "Inactive",
    serverKey: 'dushyant',
});
//---------------------------