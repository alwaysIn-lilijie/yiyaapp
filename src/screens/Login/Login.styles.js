import { StyleSheet,Dimensions } from 'react-native';
import { spacing } from '@/theme';
const {width, height} = Dimensions.get('window')
import {theme} from "@/theme"
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#fff'
  },
  bgimage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: height,
    width:width
  },
  formContainer: {
    borderRadius: 5,
    padding: spacing.s,
    width: '100%',
  },
  submitButton: {
    marginTop: spacing.m,
  },
  loginBox: {
    backgroundColor: theme.colorForNormalButton,
    width:"100%",
    height: 40,
    borderRadius: theme.DpWidth(12),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center'
   // elevation: 20,
    //shadowColor:'rgba(108, 152, 242, 1)',
    // '#52006A'//
  }
});
