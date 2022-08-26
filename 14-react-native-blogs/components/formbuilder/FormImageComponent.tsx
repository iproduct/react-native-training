import { FormComponentListener, OptionType } from './form-types';
import { ValidStatus, ChangedStatus, Validator, ValidationResult, ValidationConfig } from './validation/validate';
import { capitalize } from '../../utils/utils';
import { Component } from 'react';
import { Text, TextInput, TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import { FormComponentState, FormComponent, FormComponentProps, ComponentKinds } from './FormComponent';
import IconButton, { IconType } from '../IconButton';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker';
import { manipulateAsync, FlipType, SaveFormat, ImageResult } from 'expo-image-manipulator';
import { ImageData } from '../../model/shared-types';

const DEFAULT_BUTTON_NAME = 'Pick an Image';
const DEFAULT_BUTTON_ICON = 'image';

type SupportedMediaType = 'image/jpeg' | 'image/png' | 'image/webp';
type SupportedFileExtensions = 'jpeg' | 'jpg' | 'png' | 'webp';

const MediaTypeToFormatMap = {
    'image/jpeg': SaveFormat.JPEG,
    'image/png': SaveFormat.PNG,
    'image/webp': SaveFormat.WEBP,
}

const FileExtensionToFormatMap = {
    'jpeg': SaveFormat.JPEG,
    'jpg': SaveFormat.JPEG,
    'png': SaveFormat.PNG,
    'webp': SaveFormat.WEBP,
}


export interface FormImageComponentOptions {
    width?: number;
    height?: number;
    format?: SaveFormat;
    compress?: number;
    buttonName?: string;
    buttonIcon?: IconType;
}

export class FormImageComponent<V = ImageData>
    extends Component<FormComponentProps<V, OptionType<'FormImageComponent'>>>
    implements FormComponent<V, OptionType<'FormImageComponent'>> {
    componentKind = 'FormImageComponent' as const;

    openImagePickerAsync = async () => {
        if (!this.props.onChange) return;
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);
        if (pickerResult.cancelled === true) {
            return;
        }

        const formImageDataUri = await this.getFormImageResult(pickerResult);
        this.props.onChange(formImageDataUri as V);
    };

    async getFormImageResult(pickerResult: ImageInfo): Promise<ImageData> {
        const { uri, width, height } = pickerResult;
        const format = this.props.options?.format;
        let inferredFormat: SaveFormat;
        let localUrl: string = '';
        if (uri.startsWith('data')) {
            const mediaType = uri.substring(5, uri.indexOf(';')) as SupportedMediaType;
            inferredFormat = format || MediaTypeToFormatMap[mediaType] || SaveFormat.JPEG
        } else if (uri.startsWith('file')) {
            const fileExtension = uri.substring(uri.lastIndexOf('.') + 1) as SupportedFileExtensions;
            inferredFormat = format || FileExtensionToFormatMap[fileExtension] || SaveFormat.JPEG
            localUrl = pickerResult.uri;
        } else {
            throw 'Unsupported url type: ' + uri;
        }
        const dataUri = await convertToDataUriWithFormat(uri, inferredFormat, this.props.options?.compress || 0.6);
        return {
            uri: dataUri,
            localUri: localUrl,
            format: inferredFormat,
            width,
            height,
        };
    }


    render() {
        let { id,
            value,
            label = capitalize(id),
            options: { width, height, buttonName = DEFAULT_BUTTON_NAME, buttonIcon = DEFAULT_BUTTON_ICON } =
            { button: DEFAULT_BUTTON_NAME, buttonIcon: DEFAULT_BUTTON_ICON },
            errors = undefined,
            style = {},
            labelStyle = {},
            inputStyle = {},
            errorStyle = {},
        } = this.props;
        const imageData = value as ImageData;
        return (
            <View style={{ ...styles.view, ...style }}>
                <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
                <Text style={{ ...styles.input, ...inputStyle }}>{imageData.localUri ?? ''} [{imageData.format ?? ''}]</Text>
                <IconButton size={20} backgroundColor="green" color="white" onPress={this.openImagePickerAsync} name={buttonIcon}>
                    Pick an image
                </IconButton>
                {errors && <Text style={{ ...styles.error, ...errorStyle }}>{errors}</Text>}
            </View>
        );
    }
}

// utility functions
async function convertToDataUriWithFormat(uri: string, format: SaveFormat, compress: number) {
    const manipResult = await manipulateAsync(
        uri,
        [],
        { base64: true, compress, format }
    );
    return 'data:image/xxx;base64,' + manipResult.base64;
}


const styles = StyleSheet.create({
    view: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: '100%',
        padding: 5,
    },
    label: {
        paddingTop: 5,
        fontSize: 20,
        alignSelf: 'flex-start',
    },
    input: {
        fontSize: 20,
        borderColor: "green",
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 5,
        padding: 5,
    },
    error: {
        fontSize: 15,
        color: "red",
        borderColor: "red",
        backgroundColor: "#fcbdbd",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 5,
        padding: 5,
    }
});
