document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".nav-btn");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("data-page");
            if (page) {
                window.location.href = page;
            }
        });
    });
});
