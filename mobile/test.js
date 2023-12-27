// import { useRef, useState } from "react";
// import {
//     Dimensions,
//     Image,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import ViewShot from "react-native-view-shot";
// import axios from "axios";
// import * as RNFS from "react-native-fs";
// const LiveCameraScreen = () => {
//     const viewShot = useRef(null);
//     const [uri, setUri] = useState("");
//     const captureScreen = () => {
//         viewShot.current.capture().then((uri) => {
//             setUri(uri);
//
//             // Convert image to base64
//             RNFS.readFile(uri, 'base64')
//                 .then(base64String => {
//                     // Send the base64 string to the server
//                     axios.post('http://10.0.2.2:8000/test', {
//                         imageUri: `data:image/png;base64,${base64String}`,
//                     })
//                         .then(response => {
//                             console.log('Image uploaded successfully:', response.data);
//                         })
//                         .catch(error => {
//                             console.error('Error uploading image:', error);
//                         });
//                 })
//                 .catch(error => {
//                     console.error('Error converting image to base64:', error);
//                 });
//         });
//     };
//     return (
//         <View style={styles.container}>
//             <ViewShot ref={viewShot} style={styles.viewShot}>
//                 <View style={{ width: 200, height: 200, backgroundColor: "red" }} />
//             </ViewShot>
//             <View style={styles.buttonContainer}>
//                 <TouchableOpacity onPress={captureScreen} style={styles.btn}>
//                     <Text style={styles.btnTxt}>CAPTURE</Text>
//                 </TouchableOpacity>
//             </View>
//             {uri ? (
//                 <View style={styles.previewContainer}>
//                     <Text>Preview</Text>
//                     <Image
//                         source={{ uri: uri }}
//                         style={styles.previewImage}
//                         resizeMode="contain"
//                     />
//                 </View>
//             ) : null}
//         </View>
//     );
// };
// const SCREEN_WIDTH = Dimensions.get("screen").width;
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     viewShot: {
//         width: SCREEN_WIDTH,
//         height: SCREEN_WIDTH,
//     },
//     buttonContainer: {
//         alignSelf: "stretch",
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 10,
//     },
//     btn: {
//         padding: 8,
//     },
//     btnTxt: {
//         fontSize: 20,
//         fontWeight: "bold",
//     },
//     //   previewContainer
//     previewContainer: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 10,
//         backgroundColor: "#000",
//     },
//     previewImage: { width: 200, height: 200, backgroundColor: "#fff" },
// });
//
// export default LiveCameraScreen;
