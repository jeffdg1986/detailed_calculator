//include a settings component that will at least allow for a personalized output with fixed decimals from 0-15;
// personalized screen color and/or sounds playing upon click;
// add the ability to use the keypad with the onkeypress / onkeydown function;
// add the arc trig and hyperbolic trig functions in secondary and tertiary component made available onclick via toggle?;
// add parenthesis
// there are bugs with the x^y function
// add a fadeout animation to the error message

import './index.css';
import React, { Component } from 'react';
class DetailedCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousVal: '',
      currentVal: '',
      errorMessage: '',
      functionType: 'none', // think trig, log, hyperbolic -- could probably have another component for those with a dropdown to switch over
      variableType: 'none' // think radians, degrees, gradient, constants, etc
     } 
  }
   numbers = (e) => {
    if(this.state.variableType === 'constant'){
      this.setState({
        errorMessage: 'Constants cannot be altered, only operated on!'
      })
    }
     else if(this.state.currentVal !== '' && this.state.currentVal !== '0'){
    this.setState({
      currentVal: this.state.currentVal + e.target.value,
      variableType: 'number'
    })
        }
    else if(this.state.currentVal === '' || this.state.currentVal === '0'){
      this.setState({
        currentVal: e.target.value,
        variableType: 'number'
      })
    }
    };

    operators = (e) => {
      if(this.state.currentVal === '' && this.state.previousVal === ''){
        this.setState({
          errorMessage: 'Enter a number first!',
          variableType: 'operator'
        })
      }

      else if(this.state.currentVal === '' && isNaN(this.state.previousVal[this.state.previousVal.length])===true) {
        // says that if the last point of entry is an operator and so too is the current button, then replace
        // the last entry with current operator
        this.setState({
          previousVal: this.state.previousVal.slice(0 , this.state.previousVal.length-1) + e.target.value,
          variableType: 'operator'
        })
      }

      else if(this.state.currentVal !== ''){
        this.setState({
          previousVal: this.state.previousVal + this.state.currentVal  + e.target.value,
          currentVal: '',
          variableType: 'operator'
        })
      }
    }

  decimal = (e) => {
    if(this.state.currentVal.includes('.') === false){
      this.setState({
        currentVal: this.state.currentVal + e.target.value,
        variableType: 'decimal'
      })
    }
    else if(this.state.currentVal.includes('.') === true){
      this.setState({
        errorMessage: "Only 1 decimal point allowed!" 
      })
    }
  }  

  backspace = () => {
    if(this.state.currentVal.length === 0){
      this.setState({
        errorMessage: "There's nothing I can do here..."
      })
    }
    else if(this.state.currentVal.length > 0){
      this.setState({
        currentVal: this.state.currentVal.slice(0, this.state.currentVal.length-1),
        variableType: 'none'
      })
    }
  };

  allClear = () => {
    this.setState({
      currentVal: '',
      previousVal: '',
      errorMessage: '',
      variableType: 'none'
    })
  };
  
  clear = () => {
    this.setState({
      currentVal: '',
      errorMessage: '',
      variableType: 'none'
    })
  };

  equals = () =>{
    if(this.state.previousVal === '' || this.state.currentVal === '' || isNaN(this.state.currentVal)===true){
      this.setState({
        errorMessage: 'There\'s no operation present to perform!'
      })
    }
    else if(this.state.previousVal !== '' && isNaN(this.state.currentVal) === false){
      let x = this.state.previousVal + this.state.currentVal;
      this.setState({
        
        // eslint-disable-next-line
        currentVal: eval(x.replace(/--/g, '+')).toFixed(9),
        previousVal: '',
        errorMessage: '',
        variableType: 'none'
})
    }
    };

   zero = (e) =>{
    if(this.state.variableType === 'constant'){
      this.setState({
        errorMessage: 'Constants cannot be altered, only operated on!'
      })
    }
   else if(this.state.currentVal === ''){
this.setState({
  currentVal: e.target.value,
  variableType: 'number'
})
    }
else if(this.state.currentVal.includes('.') === true){
  this.setState({
    currentVal: this.state.currentVal + e.target.value,
    variableType: 'number'
  })
}
else if(this.state.currentVal === '0'){return}
else if(this.state.currentVal.match(/[1-9]/g).length >= 1){
  this.setState({
    currentVal: this.state.currentVal + e.target.value,
    variableType: 'number'
  })
}
  }

  parenthesisLeft = () => {
    this.setState({
      errorMessage: "Not yet coded"
    })
  };
  parenthesisRight = () => {
    this.setState({
      errorMessage: "Not yet coded"
    })
  };

pozneg = () => {
  if(this.state.currentVal === '0' || this.state.currentVal === ''){
    this.setState({
      errorMessage: "Add a non-zero number first!"
    })
  }
  else if(this.state.currentVal !== '0'){
    this.setState({
      currentVal: -this.state.currentVal
    })
  }
};

constants = (e) => {

  if(this.state.currentVal === ''){
    this.setState({
      currentVal: e.target.value,
      variableType: 'constant'
    })
  }
  else if(this.state.currentVal !== '' && this.state.functionType === 'none'){
    this.setState({
      errorMessage: 'Constants cannot be altered, only operated on!'
    })
  }
};

sin = () => {
  if(this.state.currentVal !== ''){
  this.setState({
    currentVal: Math.sin(this.state.currentVal).toFixed(15)
  })
}
else if(this.state.currentVal === ''){
  this.setState({
    errorMessage: 'Enter radians first!'
  })
}
};

cos = () => {
  if(this.state.currentVal !== ''){
  this.setState({
    currentVal: Math.cos(this.state.currentVal)
  })
}
else if(this.state.currentVal === ''){
  this.setState({
    errorMessage: 'Enter radians first!'
  })
}
};

tan = () => {
  if(this.state.currentVal !== ''){
  this.setState({
    currentVal: Math.sin(this.state.currentVal)/ Math.cos(this.state.currentVal)
  })
}
else if(this.state.currentVal === ''){
  this.setState({
    errorMessage: 'Enter radians first!'
  })
}
};

csc = () => {
  if(this.state.currentVal !== ''){
  this.setState({
    currentVal: 1/Math.sin(this.state.currentVal)
  })
}
else if(this.state.currentVal === ''){
  this.setState({
    errorMessage: 'Enter radians first!'
  })
}
};

sec = () => {
  if(this.state.currentVal !== ''){
  this.setState({
    currentVal: 1/Math.cos(this.state.currentVal)
  })
}
else if(this.state.currentVal === ''){
  this.setState({
    errorMessage: 'Enter radians first!'
  })
}
};

cot = () => {
  if(this.state.currentVal !== ''){
  this.setState({
    currentVal: Math.cos(this.state.currentVal)/Math.sin(this.state.currentVal)
  })
}
else if(this.state.currentVal === ''){
  this.setState({
    errorMessage: 'Enter radians first!'
  })
}
};
logBaseTen = () =>{
  if(this.state.currentVal !== ''){
    this.setState({
      currentVal: Math.log10(this.state.currentVal)
    })
  }
};

naturalLog = () =>{
if(this.state.currentVal !== ''){
  this.setState({
    currentVal: Math.log(this.state.currentVal)
  })
}
 }
 absoluteValue = () =>{
  if(this.state.currentVal !== ''){
    this.setState({
      currentVal: Math.abs(this.state.currentVal)
    })
  }
 }
  render() { 
    return ( 
  <>
  <div className='container'>
    <div className='interface'>
      <div className='branding'>Paracrine Solutions<img src="https://img.icons8.com/sf-regular/344/peptide.png" alt='https://www.google.com' /></div>
      <div className='screen-container'>
        <div className='equation'>{this.state.previousVal}</div>
        <div className='input'>{this.state.currentVal}</div>
        <div className='error-message'>{this.state.errorMessage}</div>
      </div>
      <div className='button-container'>
        <div className='first-row'>
          <button className='edits' onClick={this.backspace}>DEL</button>
          <button className='edits' onClick={this.allClear}>AC</button>
          <button className='edits' onClick={this.clear}>CE</button>
          <button className='edits' onClick={this.parenthesisLeft}>(</button>
          <button className='edits' onClick={this.parenthesisRight}>)</button>
        </div>
        <div className='second-row'>
          <button className='trig-functions' onClick={this.sin}>sin()</button>
          <button className='trig-functions' onClick={this.cos}>cos()</button>
          <button className='trig-functions' onClick={this.tan}>tan()</button>
          <button className='numbers' onClick={this.numbers} value= {9}>9</button>
          <button className='numbers' onClick={this.numbers} value= {8}>8</button>
        </div>
        <div className='third-row'>
          <button className='trig-functions' onClick={this.csc}>csc()</button>
          <button className='trig-functions' onClick={this.sec}>sec()</button>
          <button className='trig-functions' onClick={this.cot}>cot()</button>
          <button className='numbers' onClick={this.numbers} value= {7}>7</button>
          <button className='numbers' onClick={this.numbers} value= {6}>6</button>
        </div>
        <div className='fourth-row'>
          <button className='constants' onClick={this.constants} value= {Math.PI}>pi</button>
          <button className='constants' onClick={this.constants} value= {Math.E}>e</button>
          <button className='operators' onClick={this.operators} value= '+'>+</button>
          <button className='numbers' onClick={this.numbers} value= {5}>5</button>
          <button className='numbers' onClick={this.numbers} value= {4}>4</button>
        </div>
        <div className='fifth-row'>  
          <button className='log-functions' onClick={this.naturalLog}>ln()</button>
          <button className='log-functions' onClick={this.logBaseTen}>log<sub>10</sub>()</button>
          <button className='operators' onClick={this.operators} value= '-'>-</button>
          <button className='numbers' onClick={this.numbers} value= {3}>3</button>
          <button className='numbers' onClick={this.numbers} value= {2}>2</button>
        </div>
        <div className='sixth-row'>
          <button className='special-functions' onClick={this.operators} value= '**'>x^y</button>
          <button className='special-functions' onClick={this.absoluteValue}>|x|</button>
          <button className='operators' onClick={this.operators} value= '*'>*</button>
          <button className='numbers' onClick={this.numbers} value= {1}>1</button>
          <button className='numbers' onClick={this.zero} value= {0}>0</button>
        </div>
        <div className='seventh-row'>
          <button className='special-operators' onClick={this.pozneg}>+/-</button>
          <button className='special-operators' onClick={this.decimal} value= '.'>.</button>
          <button className='operators' onClick={this.operators} value= '/'>/</button>
          <button className='equals' onClick={this.equals}>=</button>
        </div>
      </div>
    </div>
  </div>
  <footer>This Calculator was created by: {this.props.creator}</footer>
  </> 
    );
  }
}
 
export default DetailedCalculator;
