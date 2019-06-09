import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from 'prop-types';

export default class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: this.props.start
    };

    // bind functions
    this.onPressMinus = this.onPressMinus.bind(this);
    this.onPressPlus = this.onPressPlus.bind(this);
  }

  // minus function
  onPressMinus() {
    const { number } = this.state;
    const minusNumber = (number - 1);

    if (number == this.props.min) {
      return
    }

    return this.setState({ number: minusNumber }, () => this.props.onChange(minusNumber, '-'))
  }

  //minus function
  onPressPlus() {
    const { number } = this.state;
    const plusNumber = (number + 1);

    if (number == this.props.max) {
      return
    }

    return this.setState({ number: plusNumber }, () => this.props.onChange(plusNumber, '+'))
  }

  //minus button
  renderMinusButton() {
    const { min, touchableDisabledColor, touchableColor } = this.props;
    const isMinusDisabled = min == this.state.number;
    const buttonStyle = {
      borderColor: isMinusDisabled ? touchableDisabledColor : touchableColor
    };

    return (
      <TouchableOpacity style={[Styles.touchable, buttonStyle ]} onPress={this.onPressMinus} activeOpacity={isMinusDisabled ? 0.9 : 0.2}>
        {this.props.minusIcon ? this.props.minusIcon(isMinusDisabled, touchableDisabledColor, touchableColor) :
          <Text style={[Styles.iconText, { color: isMinusDisabled ? touchableDisabledColor : touchableColor }]}>-</Text>
        }
      </TouchableOpacity>
    )
  }

  //plus button
  renderPlusButton() {
    const { max, touchableDisabledColor, touchableColor } = this.props;
    const isPlusDisabled = max == this.state.number;
    const buttonStyle = {
      borderColor: isPlusDisabled ? touchableDisabledColor : touchableColor
    };

    return (
      <TouchableOpacity style={[Styles.touchable, buttonStyle ]} onPress={this.onPressPlus} activeOpacity={isPlusDisabled ? 0.9 : 0.2}>
        {this.props.plusIcon ? this.props.plusIcon(isPlusDisabled, touchableDisabledColor, touchableColor) :
          <Text style={[Styles.iconText, { color: isPlusDisabled ? touchableDisabledColor : touchableColor }]}>+</Text>
        }
      </TouchableOpacity>
    )
  }

  render() {
    const { number } = this.state;

    return (
      <View style={Styles.container}>
        <View>
          <Text style={Styles.number}>
            {number}
          </Text>
        </View>
        <View style={Styles.buttons}>
          <View>
            {this.renderMinusButton()}
          </View>
          <View>
            {this.renderPlusButton()}
          </View>
        </View>
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 200,
  },

  number: {
    fontSize: 120,
    color: '#196583',
  },

  buttons: {
    flexDirection: "row",
  },

  touchable: {
    width: 120,
    height: 60,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    marginLeft: 20,
  }
});

Counter.propTypes = {
  start: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,


};

Counter.defaultProps = {
  start: 0,
  min: 0,
  max: 10,
  onChange(number, type) {
    // Number, - or +
  },

  touchableColor: '#27AAE1',
  touchableDisabledColor: '#B5E9FF',


};
