function validate() {
    const name = document.getElementById("name").value.trim();
    const year = document.getElementById("year").value.trim();
    const course = document.getElementById("course").value.trim();
    const key = Number(document.getElementById("key").value);
    const msg = document.getElementById("msg");

    msg.textContent = "";

    if (!name || !year || !course || !key) {
        msg.textContent = "Please fill in all fields.";
        return null;
    }

    if (key < 1 || key > 25) {
        msg.textContent = "Key must be between 1 and 25.";
        return null;
    }

    return {
        plain: `${name.toUpperCase()} | ${year} | ${course.toUpperCase()}`,
        key: key
    };
}

function shiftChar(ch, n) {
    if (ch >= 'A' && ch <= 'Z') {
        return String.fromCharCode((ch.charCodeAt(0) - 65 + n + 26) % 26 + 65);
    }
    return ch;
}

function encrypt() {
    const data = validate();
    if (!data) return;

    let result = "";
    for (let c of data.plain) {
        result += shiftChar(c, data.key);
    }

    document.getElementById("text").textContent = data.plain;
    document.getElementById("output").textContent = result;
}

function decrypt() {
    const data = validate();
    if (!data) return;

    let encrypted = "";
    for (let c of data.plain) {
        encrypted += shiftChar(c, data.key);
    }

    let decrypted = "";
    for (let c of encrypted) {
        decrypted += shiftChar(c, -data.key);
    }

    document.getElementById("text").textContent = encrypted;
    document.getElementById("output").textContent = decrypted;
}
