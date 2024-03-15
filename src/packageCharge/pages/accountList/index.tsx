import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Demo() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='demo'>
      <Text>Hello world!</Text>
    </View>
  )
}
