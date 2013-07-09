/// <reference path="../../js/jquery.d.ts" />
import utils = module("app/Utils");
import baseApp = module("app/BaseApp");
import app = module("app/App");
import shell = module("app/views/Shell");
import baseView = module("app/BaseView");

export class Footer extends baseView.BaseView {

    $fullScreenBtn: JQuery;

    constructor($element: JQuery) {
        super($element, true, false);
    }

    create(): void {
        super.create();

        // event handlers.
        $.subscribe(app.App.TOGGLE_FULLSCREEN, () => {
            this.toggleFullScreen();
        });

        this.$fullScreenBtn = $('<a href="#">' + baseApp.BaseApp.config.footer.fullScreen + '</a>');
        this.$element.append(this.$fullScreenBtn);

        this.$fullScreenBtn.on('click', (e) => {
            e.preventDefault();
            $.publish(app.App.TOGGLE_FULLSCREEN);
        });
    }

    toggleFullScreen(): void {
        if (baseApp.BaseApp.isFullScreen) {
            this.$fullScreenBtn.text(baseApp.BaseApp.config.footer.exitFullScreen);
        } else {
            this.$fullScreenBtn.text(baseApp.BaseApp.config.footer.fullScreen);
        }
    }

    resize(): void {
        super.resize();

        this.$element.css({
            'top': shell.Shell.$headerPanel.height() + shell.Shell.$mainPanel.height()
        });
    }
}