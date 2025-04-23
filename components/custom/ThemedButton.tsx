import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { globalStyles } from "../../styles";


interface Button_Props extends TouchableOpacityProps {
  text: string;
  onPress: () => void;
  type?: "success" | "danger";
}

const Button = ({
  text,
  onPress,
  type = "success",
  style}: Button_Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        buttonStyle.buttonContainer,
        buttonStyle[type],
        type === "danger" && {
          borderWidth: 1,
        },
        style,
      ]}
    >
      <Text style={[buttonStyle.buttonText, buttonStyle[type]]}>{text}</Text>
    </TouchableOpacity>
  );
};

const buttonStyle = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    marginVertical: 10,
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  success: {
    backgroundColor: "#83f28f",
  },
  danger: {
    borderColor: globalStyles.secondary.color,
    backgroundColor: "transparent",
    color: globalStyles.secondary.color,
  },
  buttonText: {
    color: "#352F36",
    fontWeight:700,
    fontSize:14
  },
});

export default Button;
