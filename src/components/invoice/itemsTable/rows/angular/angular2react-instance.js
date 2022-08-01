import { angular2react } from 'angular2react';
import angular from 'angular';
import angularComponent from './angular-component';

const angular2reactWrapper = (angularModule, rootElement) => {
    let $injector;

    angularModule.run(['$injector', function (_$injector_) {
        $injector = _$injector_;
    }]);

    angular.bootstrap(rootElement, [angularModule.name]);

    return (component, componentName) => angular2react(componentName, component, $injector);
}

const angularModule = angular
    .module('myModule', [])
    .component('angularComponent', angularComponent);

const angular2reactInstance = angular2reactWrapper(angularModule, document.getElementById('root'));

export default angular2reactInstance;
