import React, { useState } from "react";
import {
  AccessibilityRole,
  ImageProps,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  View,
  Text as RNText,
} from "react-native";
import {
  ApplicationProvider,
  Tab,
  Button,
  Icon,
  IconRegistry,
  Input,
  Layout,
  Select,
  TabView,
  Text
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { mapping, light, dark } from "@eva-design/eva";
import Constants from 'expo-constants';

const themes = {
  light: {
    theme: light,
    icon: "sun",
    text: "LIGHT",
  },
  dark: {
    theme: dark,
    icon: "moon",
    text: "DARK",
  },
};

type IconProps = {
  name: string;
  style?: ImageStyle;
};

type CustomButtonWithIconProps = {
  accessibilityRole: AccessibilityRole;
  accessibilityLabel: string;
  icon: string;
  iconStyle?: ImageStyle;
  onPress: () => void;
  text: string;
  style: any;
  status?: string;
};

const renderIcon = ({ name, style }: IconProps) => (
  <Icon {...style} name={name} />
);

const CustomButtonWithIcon = ({
  accessibilityRole,
  accessibilityLabel,
  icon,
  iconStyle,
  onPress,
  text,
  style,
  status,
}: CustomButtonWithIconProps) => {
  const ButtonIcon = () => renderIcon({ name: icon, style: iconStyle });
  return (
    <Button
      style={style}
      icon={ButtonIcon}
      onPress={onPress}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      status={status}
    >
      {text}
    </Button>
  );
};

const StatusBar = () => <Layout style={{ backgroundColor: "blue", minHeight: Constants.statusBarHeight }} />

const PersonIcon = style => (
  <Icon {...style} name='person-outline' />
);

const HomeIcon = style => (
  <Icon {...style} name='home-outline' />
);

const GearIcon = style => (
  <Icon {...style} name='settings-outline' />
);

const data = [
  { text: "Olcay's first option" },
  { text: "Olcay's second option" },
];

const App = (): React.ReactFragment => {
  const [themeName, setThemeName] = useState("light");
  const theme = themes[themeName].theme;

  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (style) => (
    <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />
  );

  const changeTheme = () => {
    setThemeName(themeName === "light" ? "dark" : "light");
  };

  const { text: themeButtonText, icon: themeButtonIcon } =
    themeName === "light" ? themes.dark : themes.light;

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState(null);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <StatusBar />
        <Layout style={styles.container}>
          <TabView
            style={styles.fill}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}>
            <Tab title='LOGIN' icon={PersonIcon}>
              <Layout style={styles.loginContainer}>
                <Text style={styles.header} category='h1'>UI Kitten Playground</Text>
                <Input
                  label='Phone Number'
                  placeholder='5*********'
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType={"number-pad"}
                  size={'large'}
                />
                <Input
                  label={'Password'}
                  value={password}
                  placeholder='********'
                  icon={renderIcon}
                  secureTextEntry={secureTextEntry}
                  onIconPress={onIconPress}
                  onChangeText={setPassword}
                  size={'large'}
                />
                <CustomButtonWithIcon
                  accessibilityRole="button"
                  accessibilityLabel="Log-In"
                  style={styles.iconButton}
                  text={`Log In`}
                  icon={'log-in'}
                  onPress={changeTheme}
                  iconStyle={{ tintColor: "white" }}
                />
                <Text style={styles.text} category='label'>Don't have an account?</Text>
                <CustomButtonWithIcon
                  accessibilityRole="button"
                  accessibilityLabel="Register"
                  style={styles.iconButton}
                  text={'Register'}
                  icon={'edit'}
                  onPress={changeTheme}
                  iconStyle={{ tintColor: "blue" }}
                  status={'basic'}
                />
              </Layout>
            </Tab>
            <Tab title='HOME' icon={HomeIcon}>
              <Layout>
                <Text category={'label'}>Hello</Text>
                <Text category={'h2'} >Olcay Karaduman</Text>
                <Select
                  data={data}
                  selectedOption={selectedOption}
                  onSelect={o => setSelectedOption(o)}
                />
              </Layout>
            </Tab>
            <Tab title='SETTINGS' icon={GearIcon}>
              <Layout>
                <CustomButtonWithIcon
                  accessibilityRole="button"
                  accessibilityLabel="UI Kitten Change Theme"
                  style={styles.iconButton}
                  text={`SWITCH TO ${themeButtonText} THEME`}
                  icon={themeButtonIcon}
                  onPress={changeTheme}
                  iconStyle={{ tintColor: "white" }}
                />
              </Layout>
            </Tab>
          </TabView>
        </Layout>
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  loginContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  header: {
    textAlign: "center",
    marginVertical: 56,
  },
  text: {
    textAlign: "center",
  },
  iconButton: {
    marginVertical: 16,
  },
  nativeButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});

export default App;