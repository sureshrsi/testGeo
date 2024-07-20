import Control from 'ol/control/Control';

class CustomLayerSwitcherControl extends Control {
  constructor(options = {}) {
    const button = document.createElement('button');
    button.innerHTML = 'L';

    const element = document.createElement('div');
    element.className = 'ol-unselectable ol-control';
    element.appendChild(button);

    super({
      element: element,
      target: options.target,
    });

    button.addEventListener('click', this.handleSwitch.bind(this), false);
  }

  handleSwitch() {
    // Open the layer switcher panel
    document.getElementById('layer-switcher-panel').classList.toggle('open');
  }
}

export default CustomLayerSwitcherControl;
