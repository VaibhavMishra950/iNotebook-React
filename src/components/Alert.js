import React from 'react'

export default function Alert(props) {
  if (props.alert) {
    return (
      <div className={props.alert.cls}>
        <p style={{ marginTop: 'auto', color: 'white' }}>
          <i style={{ marginRight: '5px' }} className={props.alert.iconCls}></i>
          {props.alert.msg}
        </p>
      </div>
    )
  }
}
