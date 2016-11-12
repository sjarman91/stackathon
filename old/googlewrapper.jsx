import {GoogleApiWrapper} from 'GoogleMapsReactComponent'

// ...

export class Container extends React.Component {}

export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__
})(Container)
