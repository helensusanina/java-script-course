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

    prototypesListElement.innerHTML = "";
    
    prototypesListElement.appendChild(
        document.createTextNode("Список прототипов:")
    );

    for (let i = 0; i < prototypes.length + 1; i++) {
        const proto = i === prototypes.length ? classFunction.prototype : prototypes[i];
        const protoListItemElement = document.createElement("li");
        let protoName = proto && proto.constructor ? proto.constructor.name : "[No Name]";
        const protoNameText = document.createTextNode(protoName);
        protoListItemElement.appendChild(protoNameText);

        const protoPropsListElement = document.createElement("ol");
        protoListItemElement.appendChild(protoPropsListElement);

        if (proto) {
            for (const propName of Object.getOwnPropertyNames(proto)) {
                const propListItemElement = document.createElement("li");
                const propNameText = document.createTextNode(`${propName}: ${typeof proto[propName]}`);
                propListItemElement.appendChild(propNameText);
                protoPropsListElement.appendChild(propListItemElement);
            }
        }

        prototypesListElement.appendChild(protoListItemElement);
    }
});
