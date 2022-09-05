import React, { Component, ReactNode } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, LayoutAnimation, UIManager } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface DataItem {
  key: string;
  value: boolean;
}

interface AccordeonPanelProps {
  title: string;
  data: DataItem[];
}

interface AccordeonPanelState {
  data: DataItem[];
  expanded: boolean;
}

interface LayoutAnimationDemo2Props {
  title: string,
  sections: { [key: string]: DataItem[] }
}

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default function LayoutAnimationDemo2({ sections, title }: LayoutAnimationDemo2Props) {
  const accrdeonPanels: ReactNode[] = [];
  for (const sectionKey in sections) {
    accrdeonPanels.push(<AccordeonPanel key={sectionKey} data={sections[sectionKey]} title={sectionKey} />);
  }
  return (
    <View>
      <Text style={{fontSize: 28}}>{title}</Text>
      {accrdeonPanels}
    </View >
  );
}

export class AccordeonPanel extends Component<AccordeonPanelProps, AccordeonPanelState> {
  state: Readonly<AccordeonPanelState> = {
    data: this.props.data,
    expanded: false,
  }

  render() {
    return (
      <View>
        <TouchableOpacity style={styles.row} onPress={() => this.toggleExpand()}>
          <Text style={[styles.title]}>{this.props.title}</Text>
          <FontAwesome name={this.state.expanded ? 'arrow-up' : 'arrow-down'} size={30} color='darkgray' />
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {
          this.state.expanded &&
          <View style={{}}>
            <FlatList
              data={this.state.data}
              numColumns={1}
              scrollEnabled={false}
              renderItem={({ item, index }) =>
                <View>
                  <TouchableOpacity
                    style={[styles.childRow, styles.button, item.value ? styles.btnActive : styles.btnInActive]}
                    onPress={() => this.onClick(index)}>
                    <Text style={[styles.itemInActive]} >{item.key}</Text>
                    <FontAwesome name='check-circle' size={24} color={item.value ? 'green' : 'lightgray'} />
                  </TouchableOpacity>
                  <View style={styles.childHr} />
                </View>
              } />
          </View>
        }

      </View>
    )
  }

  onClick = (index: number) => {
    const temp = this.state.data.slice()
    temp[index].value = !temp[index].value
    this.setState({ data: temp })
  }

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded })
  }

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: '100%',
    height: 54,
    alignItems: 'center',
    paddingLeft: 35,
    paddingRight: 35,
    fontSize: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'darkgray',
  },
  itemActive: {
    fontSize: 12,
    color: 'green',
  },
  itemInActive: {
    fontSize: 12,
    color: 'darkgray',
  },
  btnActive: {
    borderColor: 'green',
  },
  btnInActive: {
    borderColor: 'darkgray',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  childRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'gray',
  },
  parentHr: {
    height: 1,
    color: 'white',
    width: '100%'
  },
  childHr: {
    height: 1,
    backgroundColor: 'lightgray',
    width: '100%',
  },
  colorActive: {
    borderColor: 'green',
  },
  colorInActive: {
    borderColor: 'darkgray',
  }

});