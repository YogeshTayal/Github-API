'use strict';

/**
 * @ngdoc function
 * @name assignmentAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the assignmentAppApp
 */
angular.module('assignmentAppApp')
    .controller('MainCtrl', ['$http', function($http) {
        // this.searchFilter = function(obj) {
        //     var re = new RegExp(this.search, 'i');
        //     return !this.search || re.test(obj.number) || re.test(obj.user.login) || re.test(obj.state) || re.test(obj.pull_request.patch_url);
        // };
        this.fetchData = function() {
            this.issues = [];
            var storageData = sessionStorage[this.org + '##' + this.repo];
            if (storageData) {
                var dataObj = JSON.parse(storageData);
                if ((new Date().getTime() - dataObj.time) < 5000) {
                    this.issues = dataObj.issues;

                } else {
                    sessionStorage.removeItem(this, this.org + '##' + this.repo);
                    this.issues = getDataFromAPI(this, this.org, this.repo);
                }
            } else {
                this.issues = getDataFromAPI(this, this.org, this.repo);
            }
        };

        function getDataFromAPI(parent, org, repo) {
            var issues = [];
            $http({
                method: 'GET',
                url: 'https://api.github.com/repos/' + org + '/' + repo + '/issues?state=open'
            }).then(function successCallbackOpen(response) {
                issues = response.data || [];
                $http({
                    method: 'GET',
                    url: 'https://api.github.com/repos/' + org + '/' + repo + '/issues?state=closed'
                }).then(function successCallbackClosed(response) {
                    issues = issues.concat(response.data);

                    var data = JSON.stringify({
                        issues: issues,
                        time: new Date().getTime()
                    });
                    sessionStorage[org + '##' + repo] = data;
                    parent.issues = issues;
                }, function errorCallbackClosed(response) {
                    // To do if open issues gave data but closed issues gave error
                });
            }, function errorCallbackOpen(response) {
                if (response.status === 404) {
                    alert('Please enter valid org and repo');
                }
                parent.issues = [];
            });
        }
    }]);