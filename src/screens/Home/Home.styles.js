import { StyleSheet, Dimensions, StatusBar, RecyclerViewBackedScrollViewBase} from 'react-native';
import { color } from 'react-native-reanimated';

const {width, height} = Dimensions.get('window')
const cols = 2;
const rows = 3;
const vMargin = 10;
const cellW = (width- 2 * vMargin - 15)/cols;
const hMargin = 25;
const cellH = (height - 2* vMargin - hMargin - StatusBar.currentHeight)/rows;


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#d7def6'
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  list_container: {
      // 主轴方向
      flexDirection:'row',
      justifyContent: 'space-between',
      // 一行显示不下,换一行
      // flexWrap:'wrap',
      // 侧轴方向
      alignItems:'center', // 必须设置,否则换行不起作用
      paddingHorizontal: 10,
  },
  item: {
      width:'45%',
      marginLeft:'3.3%',
      marginTop:hMargin,
      alignItems: 'center',
      borderColor: '#000000',
      borderRadius: 12,
      borderWidth:0,
      backgroundColor:'rgba(255, 255, 255, 0.5)',
      //opacity:0.5
  },
  item_title: {
    fontSize: 36,
    color: 'black',
    opacity: 1,
    paddingTop:23
  },
  item_text:{
    fontSize: 16,
    fontWeight:'bold',
    color: 'rgba(0, 0, 0, 1)'
  }
});
