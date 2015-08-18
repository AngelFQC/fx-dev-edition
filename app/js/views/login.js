define([
    'jquery',
    'underscore',
    'backbone',
    'text!template/login.html',
    'models/campus'
], function ($, _, Backbone, LoginTemplate, CampusModel) {
    var LoginView = Backbone.View.extend({
        tagName: 'section',
        className: 'container',
        template: _.template(LoginTemplate),
        events: {
            'submit #frm-login': 'frmLoginOnSubmit',
            'click #chk-password': 'chkPasswordOnCheck'
        },
        render: function () {
            this.el.innerHTML = this.template();

            return this;
        },
        frmLoginOnSubmit: function (e) {
            e.preventDefault();

            var self = this;

            var hostName = self.$('#txt-hostname').val().trim();
            var username = self.$('#txt-username').val().trim();
            var password = self.$('#txt-password').val().trim();

            if (!hostName) {
                return;
            }

            if (!username) {
                return;
            }

            if (!password) {
                return;
            }

            self.$('#btn-submit').prop('disabled', true);

            var checkingLogin = $.post(hostName + '/main/webservices/rest.php', {
                action: 'loginNewMessages',
                username: username,
                password: password
            });

            $.when(checkingLogin).done(function (response) {
                if (!response.status) {
                    self.$('#btn-submit').prop('disabled', false);

                    return;
                }

                var campusModel = new CampusModel({
                    url: hostName,
                    username: username,
                    apiKey: response.apiKey
                });
                var savingCampus = campusModel.save();

                $.when(savingCampus).done(function () {
                    window.location.reload();
                });

                $.when(savingCampus).fail(function () {
                    self.$('#btn-submit').prop('disabled', false);
                });
            });

            $.when(checkingLogin).fail(function () {
                self.$('#btn-submit').prop('disabled', false);
            });
        },
        chkPasswordOnCheck: function (e) {
            var inputType = e.target.checked ? 'text' : 'password';

            this.$('#txt-password').attr('type', inputType);
        }
    });

    return LoginView;
});
