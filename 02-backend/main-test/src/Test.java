public class Test {

    public static void main(String[]args){
        int arr[]= {10, 20, 30, 40,50,99,80,100};
        int halfleng= Math.round(arr.length/2);
        System.out.println(halfleng);
        int swap =0;
        int j= arr.length-1;

        for(int i=0;i<halfleng ;i++) {
            swap = arr[i];
            arr[i] = arr[j];
            arr[j] = swap;
            j--;

        }


        System.out.println(arr.toString());
        for (int value : arr) {
            System.out.println(value);
        }

    }
}
