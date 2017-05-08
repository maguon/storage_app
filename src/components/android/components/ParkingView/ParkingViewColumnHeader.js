
import React, { Component } from 'react'
import { Text, View ,ScrollView} from 'react-native'
import { connect } from 'react-redux'

export default class ParkingViewColumnHeader extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView  
            horizontal={true} 
            showsHorizontalScrollIndicator={false} 
            style={{backgroundColor:'red' }}>
                <Text>1</Text>
                <Text>2</Text>
                <Text>3</Text>
                <Text>4</Text>
                <Text>5</Text>
                <Text>6</Text>
                <Text>7</Text>
                <Text>8</Text>
                <Text>9</Text>
                <Text>10</Text>
                <Text>11</Text>
                <Text>12</Text>
                <Text>13</Text>
                <Text>14</Text>
                <Text>15</Text>
                <Text>16</Text>
                <Text>17</Text>
                <Text>18</Text>
                <Text>19</Text>
                <Text>20</Text>
                <Text>21</Text>
                <Text>22</Text>
                <Text>23</Text>
                <Text>24</Text>
                <Text>25</Text>
                <Text>26</Text>
                <Text>27</Text>
                <Text>28</Text>
                <Text>29</Text>
                <Text>30</Text>
                <Text>31</Text>
                <Text>32</Text>
                <Text>33</Text>
                <Text>34</Text>
                <Text>35</Text>
                <Text>36</Text>
                <Text>37</Text>
                <Text>38</Text>
                <Text>39</Text>
                <Text>40</Text>
                <Text>41</Text>
                <Text>42</Text>
                <Text>43</Text>
                <Text>44</Text>
                <Text>45</Text>
                <Text>46</Text>
                <Text>47</Text>
                <Text>48</Text>
                <Text>49</Text>
            </ScrollView>
        )
    }

}