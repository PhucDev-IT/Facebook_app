import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Item,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  BackHandler,
  Alert,
  PermissionsAndroid,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from "react-native";

import { React, useState, useEffect, useRef, useContext } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome, EvilIcons, AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { BottomSheet } from "react-native-btr";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import Swiper from "react-native-swiper";
import { MaterialIcons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import Countries from "./Selected.js";
import { firebase } from "../../config.js";
import * as FileSystem from "expo-file-system";
import { UserContext } from '../../UserContext';
const Add_articles = ({ navigation }) => {
  const { userCurrent } = useContext(UserContext);
  const [user, setUser] = useState(userCurrent);
  const [Hienthi, setHienthi] = useState(true);

  const HandeHienthi = () => {
    setHienthi(true);
  };
  // back trang chu
  const backTrangchu = () => {
    navigation.navigate("Home");
  };
  // lấy data cua use

  //  console.log(data._id)
  // thuc hien select Share option
  const [permission, setPermission] = useState("public");
  const countries = Countries;
  // botomsheeet cho phần lựa chon keier bà
  const [visible, setVisible] = useState(false);
  const bootomShetShare = () => {
    setVisible(!visible);
  };
  const [visible2, setVisible2] = useState(false);
  // set trang thai để cho thẻ view text và view ảnh được hiển thị
  const [viewHienthi, setView] = useState(1);
  // cho phép chọn post ânr hoặc hiển thị
  let [isSelectable, setIsSelectable] = useState(false);
  // mục nhấn chon ảnh  câps quyền cho ảnh
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [selectedImages, setSelectedImages] = useState([]);
  let ArrayImage = [];
  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("Link ảnh lấy ra: ", result);
    if (!result.canceled) {
      setSelectedImages(
        result.assets.map((asset) => {
          return { path: asset.uri };
        })
      );
    }
  };
  useEffect(() => {
    const postImage = () => {
      if (selectedImages.length == 0) {
        setView(1);
        setIsSelectable(false);
      } else {
        setView(2);
        setIsSelectable(true);
      }
    };
    postImage();
  }, [selectedImages]);

  // set trang thai cho text thay đoi
  const [isText, setIsText] = useState();
  const onchangerTexT = (value) => {
    setIsText(value);
    if (value == "" && selectedImages.length == 0) {
      setIsSelectable(false);
    } else if (value == "" && selectedImages.length > 0) {
      setIsSelectable(true);
    } else {
      setIsSelectable(true);
    }
  };
  // set lai khi xoa di 1 cai anh
  const XoaAnh = (image, index) => {
    console.log('hdhuhfujdfdhsbf')
    console.log(image, index);
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
    if (newImages.length === 0) {
      setView(1);
    }
  };

  // nêu mà loai bor chọn ảnh thì quay vè trang status
  useEffect(() => {
    const setTrangThai = () => {
      if (selectedImages.length == 0) {
        setView(1);
      }
    };
    setTrangThai();
  }, [selectedImages]);

  const cameraRef = useRef();
  const [pickedImagePath, setPickedImagePath] = useState("");

  // const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState(null);
  const [flast, setFlast] = useState("off");
  const [startCamera, setStartCamera] = useState(true);
  const [isView, setIsView] = useState(true);

  __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      // start the camera
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };

  // cho phép bạn chọn vaof thựo tính nào
  const [selectedOption, setSelectedOption] = useState("16:9");
  const handlePress = (option) => {
    setSelectedOption(option);
  };
  useEffect(() => {}, [selectedOption]);
  // tương tác với ảnh sau khi đưuocj chupk
  const [capturedImage, setCapturedImage] = useState(null);

  const __takePicture = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync();
    setCapturedImage(photo);
    setIsView(false);
    setStartCamera(false);
  };
  // cho phép đổi canm
  const [type, setType] = useState(CameraType.front);
  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };
  // khi bạn bấm với nut save
  const SaveImage = () => {
    setView(3);
    setHienthi(true);
    setIsSelectable(true);
  };

  // cho phép nhấn xóa khi khoong ưng cái ảnh này
  const __retakePicture = () => {
    setCapturedImage(null);
    setIsView(true);
    __startCamera();
  };
  const [flashMode, setFlashMode] = useState("off");
  const __handleFlashMode = () => {
    console.log(flashMode);
    if (flashMode === "on") {
      setFlashMode("off");
    } else if (flashMode === "off") {
      setFlashMode("on");
    } else {
      setFlashMode("auto");
    }
  };

  // thuc hien set load khi nhấn vào
  const [loading, setLoading] = useState(false);
  // thưc hien lay du lieu gui len axios
  const [feel, setFell] = useState(null);
  // tạo  1 đôis tượng form đa ta

  const handleUplaodPost = async () => {
    setLoading(true);
    try {
      const imageUrls = [];
      for (const image of selectedImages) {
        const { uri } = await FileSystem.getInfoAsync(image.path);
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            resolve(xhr.response);
          };
          xhr.onerror = (e) => {
            reject(new TypeError("Mạng không ổn định"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send();
        });

        const filename = `${Date.now()}`;

        const ref = firebase
          .storage()
          .ref()
          .child("posts/" + filename);
        await ref.put(blob);
        // Lấy download URL của tệp đã tải lên
        const downloadURL = await ref.getDownloadURL();
        // Lưu download URL vào mảng imageUrls
        await imageUrls.push(downloadURL);
      }
      console.log(
        feel,
        isText,

        user.userID
      );
      const uid = user.userID;
      let datetime = new Date();

      let datePostTimstemp = await datetime.toISOString().slice(0, -5);

      console.log(uid + "uususTime" + datePostTimstemp);
      // Sau đó, bạn có thể thêm dữ liệu vào collection "itemPosts"
      firebase
        .firestore()
        .collection("posts")
        .add({
          text: isText,
          images: imageUrls,
          feeling: feel,
          quantityLike: 0,
          quantityComment: 0,
          Permission: permission,
          userID: uid,
          ArrUserlike: [{ userID: uid, trangthai: false }],
          Timer: datePostTimstemp,
        });
      setLoading(false);
      navigation.navigate("Home");
      alert("Thành công");

      setSelectedImages([]); // Reset danh sách các hình ảnh sau khi đã tải lên thành công
    } catch (error) {
      setLoading(false);
      console.error("Lỗi khi tải lên hình ảnh:", error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {Hienthi && (
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => backTrangchu()}
              style={{ flexDirection: "row" }}
            >
              <Ionicons name="arrow-back" size={26} color="white" />
              <Text style={{ color: "white" }}> Create Post</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleUplaodPost}
              style={{
                flexDirection: "row",
                backgroundColor: true ? "blue" : "green",
                width: "15%",
                height: "60%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>POST</Text>
              <Spinner
                visible={loading}
                textContent={"Đang tải..."}
                textStyle={{ color: "#FFF" }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.view1}>
            <View style={styles.view2}>
              <Image style={styles.img1} source={{ uri: user.avatar }} />
            </View>
            <View style={styles.view5}>
              <View style={styles.view3}>
                <Text style={styles.txt1}>{user.DisplayName}</Text>
              </View>
              <View style={styles.view6}>
                <SelectDropdown
                  data={Countries}
                  onSelect={(selectedItem, index) => {
                    setPermission(selectedItem.title);
                  }}
                  buttonStyle={styles.bnts1}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.title;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.title;
                  }}
                  buttonTextStyle={{
                    color: "white",
                  }}
                  renderDropdownIcon={(isOpened) => {
                    return (
                      <FontAwesome
                        name={isOpened ? "chevron-up" : "chevron-down"}
                        color={"#333333"}
                        size={18}
                      />
                    );
                  }}
                  dropdownIconPosition={"left"}
                  dropdownStyle={styles.dropdown4DropdownStyle}
                  rowStyle={{
                    backgroundColor: "#333333",
                  }}
                  rowTextStyle={{
                    color: "white",
                    fontWeight: "800",
                  }}
                />
                <TouchableOpacity style={styles.touch2}>
                  <Entypo name="add-to-list" size={24} color="black" />
                  <Text style={{ color: "white" }}> Album</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.view7}>
            {viewHienthi == 1 && (
              <View style={styles.view8}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                  <TextInput
                    placeholder="What on your mind ?"
                    placeholderTextColor={"white"}
                    style={styles.tip1}
                    multiline
                    onChangeText={onchangerTexT}
                    underlineColorAndroid="transparent"
                    value={isText}
                  ></TextInput>
                  <Text style={{ color: "white", fontSize: 16 }}> {feel}</Text>
                </ScrollView>
              </View>
            )}
            {viewHienthi == 2 && (
              <View style={styles.view9}>
                <ScrollView>
                  <TextInput
                    placeholder="What you think ?"
                    placeholderTextColor={"white"}
                    style={styles.tip2}
                    multiline
                    value={isText}
                    onChangeText={onchangerTexT}
                  ></TextInput>
                  <Text style={{ color: "white", fontSize: 16 }}>{feel}</Text>
                  <Swiper
                    style={{
                      height: "95%",
                    }}
                    loop={true}
                  >
                    {selectedImages.map((image, index) => (
                      <View key={index} style={{ position: "relative" }}>
                        <TouchableOpacity
                          onPress={() => {
                            console.log("anh được xoas");
                            XoaAnh(image.path, index);
                          }}
                          style={styles.touch3}
                        >
                          <Text style={styles.txt2}>x</Text>
                          <Text>
                            {index}/{selectedImages.length}
                          </Text>
                        </TouchableOpacity>
                        <Image
                          key={index}
                          source={{ uri: image.path }}
                          style={styles.img3}
                        />
                      </View>
                    ))}
                  </Swiper>
                </ScrollView>
              </View>
            )}
            {viewHienthi == 3 && (
              <View style={styles.view12}>
                <TextInput
                  placeholder="What you think ?"
                  placeholderTextColor={"white"}
                  style={styles.tip3}
                  multiline
                  value={isText}
                  onChangeText={onchangerTexT}
                ></TextInput>
                <Text style={{ color: "white", fontSize: 16 }}>{feel}</Text>
                <View style={styles.view14}>
                  <Image
                    source={{ uri: capturedImage.uri }}
                    style={styles.img3}
                  />
                </View>
              </View>
            )}

            <View style={styles.view13}>
              <TouchableOpacity onPress={pickImages} style={{}}>
                <Ionicons name="images" size={24} color="#00FF00" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setHienthi(false);
                }}
                style={{}}
              >
                <Entypo name="video-camera" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={{}}>
                <Entypo name="add-user" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={bootomShetShare} style={{}}>
                <Entypo name="emoji-happy" size={25} color="orange" />
              </TouchableOpacity>
              <TouchableOpacity style={{}}>
                <FontAwesome5 name="map-marker-alt" size={24} color="red" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.touch4}>
                <AntDesign name="ellipsis1" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* ============================Camera=============================================== */}
      {!Hienthi && (
        <View style={{ flex: 1 }}>
          <View style={styles.view16}>
            {isView && (
              <TouchableOpacity
                onPress={HandeHienthi}
                style={{ flexDirection: "row" }}
              >
                <Ionicons name="arrow-back" size={26} color="white" />
                <Text style={{ color: "white" }}> Back</Text>
              </TouchableOpacity>
            )}
            {!isView && (
              <TouchableOpacity
                onPress={__retakePicture}
                style={{ flexDirection: "row" }}
              >
                <Text style={{ color: "white" }}> Back</Text>
              </TouchableOpacity>
            )}
            {!isView && (
              <TouchableOpacity
                onPress={SaveImage}
                style={{ flexDirection: "row" }}
              >
                <Text style={{ color: "white" }}> Save</Text>
              </TouchableOpacity>
            )}
          </View>
          {isView && (
            <View style={styles.view11}>
              <View style={styles.view17}>
                <TouchableOpacity onPress={toggleCameraType}>
                  <MaterialIcons
                    name="flip-camera-android"
                    size={24}
                    color="red"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={__handleFlashMode}>
                  <Entypo
                    name="flash"
                    size={25}
                    color={flashMode === "off" ? "#000" : "#fff"}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons
                    name="color-filter-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Entypo name="eye" size={26} color="black" />
                </TouchableOpacity>
              </View>
              {startCamera && (
                <Camera
                  flashMode={flashMode}
                  style={{
                    flex: 0.9,
                    width: "100%",
                  }}
                  ref={cameraRef}
                  type={type}
                ></Camera>
              )}

              <View style={styles.view10}>
                <View style={styles.view18}>
                  <TouchableOpacity onPress={() => handlePress("64mp")}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "white",
                        opacity: selectedOption === "64mp" ? 1 : 0.5,
                        fontWeight:
                          selectedOption === "64mp" ? "bold" : "normal",
                      }}
                    >
                      64mp
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={__takePicture}
                  style={styles.touch5}
                />
              </View>
            </View>
          )}
          {!isView && (
            <View
              style={{
                backgroundColor: "transparent",
                flex: 1,
                width: "100%",
                height: "100%",
              }}
            >
              <ImageBackground
                source={{ uri: capturedImage && capturedImage.uri }}
                style={{
                  flex: 1,
                }}
              />
            </View>
          )}
          <View style={styles.view19}></View>
        </View>
      )}
      <BottomSheet visible={visible} onBackdropPress={bootomShetShare}>
        {/*Bottom Sheet inner View*/}
        <View style={{ flex: 0.6, backgroundColor: "white" }}>
          <Text style={styles.txt7}>Cảm xúc</Text>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ backgroundColor: "red" }}
          >
            <TouchableOpacity
              onPress={() => {
                setFell(" -Đang cảm thấy vui vẻ");
                setVisible(!visible);
              }}
              style={styles.touch6}
            >
              <Text>Đang cảm thấy vui vẻ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setFell(" -Đang cảm thấy buồn😒😒");
                setVisible(!visible);
              }}
              style={styles.touch6}
            >
              <Text>Đang cảm thấy buồn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFell(" -Đang cảm thấy may mắn😂😂");
                setVisible(!visible);
              }}
              style={styles.touch6}
            >
              <Text>Đang cảm thấy may mắn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFell(" -Đang cảm thấy hạnh phúc😍😍");
                setVisible(!visible);
              }}
              style={styles.touch6}
            >
              <Text>Đang cảm thấy hạnh phúc</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFell(" -Đang cảm thấy bực mình😒😒");
                setVisible(!visible);
              }}
              style={styles.touch6}
            >
              <Text>Đang cảm thấy bực mình</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFell(" -Đang cảm thấy đáng yêu 😊😊");
                setVisible(!visible);
              }}
              style={styles.touch6}
            >
              <Text>Đang cảm thấy bực mình😊😊</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFell(" -Đang cảm thấy nhớ nhà");
                setVisible(!visible);
              }}
              style={styles.touch6}
            >
              <Text>Đang cảm thấy nhớ nhà</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFell(" -Đang cảm thấy đáng ❤️😍");
                setVisible(!visible);
              }}
              style={styles.touch6}
            >
              <Text>Đang cảm thấy đáng yêu❤️💕</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFell(" -Đang cảm thấy đáng cute ❤️😍");
                setVisible(!visible);
              }}
              style={styles.touch6}
            >
              <Text>Đang cảm thấy đáng cute❤️💕</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </BottomSheet>
    </View>
  );
};
export default Add_articles;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#222222",
    width: "100%",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  view1: {
    backgroundColor: "#333333",
    width: "100%",
    height: 90,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  view2: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: "#999999",
  },
  img1: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  view3: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  txt1: {
    fontSize: 30,
    color: "white",
    fontWeight: "600",
  },
  view4: {
    color: "white",
    fontSize: 17,
  },
  view5: {
    marginLeft: 14,
    flex: 1,
  },
  view6: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,
    justifyContent: "space-around",
  },
  bnts1: {
    width: 120,
    height: 40,
    borderBottomColor: "#339900",
    borderRadius: 12,
    backgroundColor: "#3366CC",
  },
  touch2: {
    width: 120,
    height: 40,
    borderBottomColor: "#FF3300",
    borderRadius: 12,
    backgroundColor: "#3366CC",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  view7: {
    width: "100%",
    height: "100%",
  },
  view8: {
    backgroundColor: "#444444",
    width: "100%",
    height: 600,
    padding: 10,
  },
  tip1: { color: "white", fontSize: 18 },
  view9: {
    backgroundColor: "#444444",
    width: "100%",
    height: "74%",
    paddingTop: 10,
  },
  tip2: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
  },
  view10: {
    width: "100%",
    height: "30%",
    backgroundColor: "rgba(52, 52, 52, 0.2)",
    position: "absolute",
    bottom: 0,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  touch3: {
    position: "absolute",
    zIndex: 1,
    right: 10,
  },
  txt2: {
    fontSize: 30,
    fontWeight: "300",
    color: "white",
  },
  view11: {
    flex: 1,
    position: "relative",
    backgroundColor: "#33333",
    zIndex: 1,
  },
  view12: {
    backgroundColor: "#C0C0C0",
    width: "100%",
    height: 600,
    paddingTop: 10,
  },
  img3: { width: "100%", height: "100%" },
  tip3: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
  },
  view13: {
    width: "100%",
    height: 75,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#808080",
  },
  view14: {
    width: "100%",
    height: 600,
    backgroundColor: "#33333",
  },
  touch4: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#C0C0C0",
    justifyContent: "center",
    alignItems: "center",
  },
  view16: {
    backgroundColor: "#222222",
    width: "100%",
    height: "5%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  touch5: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#fff",
  },

  view17: {
    width: "100%",
    height: "8%",
    backgroundColor: "rgba(52, 52, 52, 0.1)",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  view18: {
    width: "60%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  view19: {
    width: "100%",
    height: "8%",
    backgroundColor: "black",
    bottom: 0,
  },
  touch6: {
    width: "100%",
    height: 50,
    backgroundColor: "#33333",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  txt7: {
    textAlign: "center",
    padding: 20,
    fontSize: 20,
  },
});
