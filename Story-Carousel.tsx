import * as React from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import News from "../Home/news.json";
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar } from "react-native-paper";
import FastImage from "react-native-fast-image";

import { useNavigation } from "@react-navigation/native";

interface ProfilePhotoListProps {
    item: string;
}

const ProfilePhotoList = (item, props: ProfilePhotoListProps) => {
    const [onloadingImage, setOnloadingImage] = React.useState(false);
    return (
        <View
            style={[
                style.profileImage,
                { top: 0, left: 0, right: 0 },
            ]}>
            {onloadingImage && (
                <ActivityIndicator
                    size="large"
                    color={"blue"}
                    style={style.loaderImage}
                />
            )}
            <FastImage
                onLoadStart={() => {
                    setOnloadingImage(true);
                }}
                onLoadEnd={() => {
                    setOnloadingImage(false);
                }}
                style={{ position: 'absolute', width: "100%", height: "100%", aspectRatio: 0.5 }}
                source={{
                    uri: item.item.image_url,
                    priority: FastImage.priority.high,

                }}
                resizeMode="cover"
            />
            <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
                style={{ flex: 1, width: '100%' }}
            >
                <View style={style.dataContainer}>
                    <View
                        style={style.categoryContainer}
                    >
                        <Text
                            style={style.categoryText}
                        >
                            {item.item.category}
                        </Text>
                    </View>
                    <Text
                        style={style.titleText}
                    >
                        {item.item.title}
                    </Text>
                </View>
            </LinearGradient>

        </View >
    );
};

export const Profile = (props) => {
    const navigation = useNavigation();
    const [arrayIndex, setarrayIndex] = React.useState<number>(0);

    const renderStatusBarItem = () => {
        return News.map((item, index, array) => {
            const isActive = index === arrayIndex;
            const progressBarColor = isActive ? "white" : "white";
            const progressBarHeight = isActive ? 1 : 1;

            return (
                <View style={{ flex: 1, marginHorizontal: 3, height: 2, borderRadius: 2 }} key={index}>
                    <ProgressBar
                        progress={isActive ? 1 : 0}
                        color={progressBarColor}
                        style={{ height: progressBarHeight, borderRadius: 2 }}
                    />
                    {isActive && (
                        <View
                            style={{
                                backgroundColor: "#ffffff",
                                position: "absolute",
                                bottom: 1,
                                height: 2,
                                width: "100%",
                                borderRadius: 2
                            }}
                        />
                    )}
                </View>
            );
        });
    };

    const onViewProfileRef = React.useRef((viewableItems) => {
        const { changed } = viewableItems;
        if (changed && changed.length > 0) {
            setarrayIndex(changed[0].index);
        }
    });

    const viewProfileConfigRef = React.useRef({
        viewAreaCoveragePercentThreshold: 50,
    });

    return (
        <View style={[style.container]}>
            <FlatList
                horizontal
                data={News}
                // extraData={profilePhotos}
                renderItem={({ item, index }) => <ProfilePhotoList item={item} />}
                keyExtractor={(item, index) => index.toString()}
                pagingEnabled
                bounces={false}
                onViewableItemsChanged={onViewProfileRef.current}
                viewabilityConfig={viewProfileConfigRef.current}
                scrollEventThrottle={16}
                snapToAlignment="start"
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={style.emptyProfile}>
                        <Text style={{ fontSize: 15 }}>No Profile Image Available</Text>
                    </View>
                }
            />
            <View style={style.containerTop}>
                <View style={style.progressContainer}>{renderStatusBarItem()}</View>
                <Pressable style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '2%' }} onPress={() => navigation.goBack()}>
                    <Image
                        source={require("../../assets/icons/back2.png")}
                        style={{ height: 40, width: 40, marginLeft: "2%" }}
                    />
                    <Image
                        source={require("../../assets/icons/menu2.png")}
                        style={{ height: 40, width: 40, marginRight: "2%" }}
                    />

                </Pressable>
            </View>
        </View>
    );
};


const style = StyleSheet.create({
    container: {
        flex: 1
    },
    containerTop: {
        position: "absolute",
        backgroundColor: "transparent",
        paddingTop: 30,
        width: "100%",
    },
    progressContainer: {
        flex: 0.01,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        alignContent: "center",
        // paddingHorizontal: scale(20),
        paddingBottom: 10,
        marginTop: 20,
    },
    dataContainer: {
        position: "absolute",
        bottom: "6%",
        width: "100%",
        marginLeft: "2%",
        paddingHorizontal: '4%'
    },

    loaderImage: {
        alignItems: "center",
        position: "absolute",
        left: "45%",
        top: "45%",
    },
    profileImage: {
        flex: 1,

        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,

    },

    emptyProfile: {
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
    },
    categoryContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        height: 28,
        width: "28%",
        borderRadius: 15,
        marginBottom: 10,
    },
    categoryText: {
        fontSize: 20,
        color: "black",
        fontWeight: "800",
        justifyContent: "center",
        textTransform: "capitalize",
        letterSpacing: 0.6,
    },
    titleText: {
        fontSize: 20,
        color: "white",
        fontWeight: "800",
        letterSpacing: 1,
        lineHeight: 45,
    }
});
