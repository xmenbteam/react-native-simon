import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import Leaderboard from "react-native-leaderboard";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { firebase } from "../src/firebaseConfig";

const LeaderBoard = () => {
  let [fontsLoaded, error] = Font.useFonts({
    Graduate: require("../assets/fonts/Graduate-Regular.ttf"),
  });

  const [userDb, setUserData] = useState([]);
  const [scoreDb, setScoreData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  //Connects score data collection and user data collection by their id and returns a single object with the data

  const fullData = scoreDb.map((score) => ({
    ...score,
    ...userDb.find((user) => user.id === score.id),
  }));

  const getAndLoadHttpUrl = async (user) => {
    firebase
      .storage()
      .ref(`/${user.userImg}`) //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      })
      .catch((e) => console.log("Errors while downloading => ", e));
  };

  useEffect(() => {
    //sets users data by username and id
    const names = firebase
      .firestore()
      .collection("users")
      .get()
      .then(
        (snap) => {
          const userData = [];
          snap.forEach((doc) => {
            getAndLoadHttpUrl(doc.data());
            userData.push({
              userName: doc.data().username,
              id: doc.data().id,
              icon: imageUrl,
            });
          });
          setUserData(userData);
          console.log(userData);
        },
        [imageUrl]
      );
    //sets scores data by score and id
    const scores = firebase
      .firestore()
      .collection("scores")
      .get()
      .then((snap) => {
        const scoreData = [];
        snap.forEach((doc) => {
          scoreData.push({
            highScore: doc.data().highScore,
            id: doc.data().id,
            icon: doc.data().userImg,
          });
        });
        scoreData.forEach((score) => {});
        setScoreData(scoreData);
      });
  }, []);

  useEffect(() => {
    //sets the joined user/score data when the userDb and scoreDb have updated
    setAllData(fullData);
  }, [userDb, scoreDb]);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.leaderboard}>
        <View style={styles.textView}>
          <Image
            style={styles.img}
            source={require("../assets/Argulympics-no-logo.png")}
          />
          <Text style={styles.text}>🏆 Leaderboard 🏆</Text>
        </View>
        <View style={styles.leaderboardCont}>
          <Leaderboard
            data={fullData}
            sortBy="highScore"
            labelBy="userName"
            oddRowColor="#bde0fe"
            icon="icon"
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  leaderboard: {
    flex: 1,
    backgroundColor: "#bde0fe",
  },
  textView: {
    flex: 1,
    alignItems: "center",
  },
  leaderboardCont: {
    flex: 4,
  },
  img: {
    flex: 1,
    width: "90%",
    resizeMode: "center",
  },
  text: {
    flex: 1,
    fontSize: 30,
    fontFamily: "Graduate",
  },
});

export default LeaderBoard;