const prototypesListElement = document.getElementById("prototypes-list");
const classNameInputElement = document.getElementById("class-name");
const showPrototypesButtonElement = document.getElementById("show-prototypes");

showPrototypesButtonElement.addEventListener("click", () => {
    const className = classNameInputElement.value;
    const classFunction = window[className];
    if (!classFunction || typeof classFunction !== "function") {
        classNameInputElement.style.borderColor = "red";
        return;
    }

    classNameInputElement.style.borderColor = "initial";

    const prototypes = [];
    let currentPrototype = classFunction.prototype;
    while (currentPrototype) {
        prototypes.push(currentPrototype);
        currentPrototype = Object.getPrototypeOf(currentPrototype);
    }

    prototypesListElement.innerHTML = "Список прототипов:";

    prototypes.forEach(proto => {
        const protoListItemElement = document.createElement("li");
        let protoName = proto.constructor ? proto.constructor.name : "[No Name]";
        const protoNameText = document.createTextNode(protoName);
        protoListItemElement.appendChild(protoNameText);

        const protoPropsListElement = document.createElement("ol");
        protoListItemElement.appendChild(protoPropsListElement);

        prototypesListElement.appendChild(protoListItemElement);
    });
});
