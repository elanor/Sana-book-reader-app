import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";
import data from "./data.json";

//styles calculated

const height = Dimensions.get("window").height; //full height
const width_proportion = "95%";

// put blocks into hash by blockId
const blockById = {};
for (let block of data.blocks) {
  blockById[block.blockId] = block;
}

window.scroll(function () {
  ".container".css("opacity", 2 - window.scrollTop() / 500);
});

// find first block
const startBlock = data.blocks.find((block) => block.startBlock);

export default function App() {
  // keep id of the current block
  const [currentBlockId, setCurrentBlockId] = useState(startBlock.blockId);

  // find current block by id
  const currentBlock = blockById[currentBlockId];

  // take out its details
  const text = currentBlock.content.replace(/&rsquo;|&#x2019;|&#x27;/g, "'");
  const option1Text = currentBlock.choseOne.text.replace(/[“”]/gi, "");
  const option1Id = currentBlock.choseOne.target;
  const option2Text = currentBlock.choseTwo.text.replace(/[“”]/gi, "");
  const option2Id = currentBlock.choseTwo.target;

  //clear text from html tags

  const textClear = text.replace(
    /&rdquo;|&ldquo;|&ldquo;|&#x201C;|&#x201D;/g,
    '"'
  );
  const textClear2 = textClear.replace(/\<p\>(.*?)(<\/p>)/g, "$1\n");

  return (
    <View style={styles.container}>
      <Text style={styles.textMain}>{textClear2}</Text>
      <Text style={styles.dotsDivider}>. . . . . . . . . . . . .</Text>
      <Text style={styles.makeChoice}>Make a choice</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCurrentBlockId(option1Id)}
      >
        <Text style={styles.buttonText}> {option1Text} </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCurrentBlockId(option2Id)}
      >
        <Text style={styles.buttonText}> {option2Text} </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
    marginHorizontal: 18,
    textAlign: "left",
    paddingHorizontal: 12,
    paddingVertical: 20,
    opacity: 1,
    width: width_proportion,
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    flexDirection: "column",
    height: height
  },

  textMain: {
    fontFamily: "Lora-Regular",
    userSelect: "text",
    fontSize: 20
    //lineHeight: 15, //1.5rem
  },

  button: {
    backgroundColor: "#75b2b7",
    borderRadius: 12,
    borderColor: "#75b2b7",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    marginVertical: 4,
    cursor: "pointer",
    width: width_proportion
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Lora-Regular"
  },

  dotsDivider: {
    fontSize: 40,
    marginVertical: 12,
    marginHorizontal: "auto",
    alignContent: "center",
    justifyContent: "center",
    color: "#75b2b7",
    textAlign: "center",
    alignItems: "stretch"
  },

  makeChoice: {
    fontFamily: "Lora-Bold",
    fontWeight: 700,
    textAlign: "center",
    fontSize: 18,
    marginVertical: 12,
    marginHorizontal: "auto",
    userSelect: "none"
  }
});
