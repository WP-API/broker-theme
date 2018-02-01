<?php
/**
 * Walk a nav menu and build a threaded tree.
 *
 * @link https://gist.github.com/kucrut/efb593d4b263a4b1b6df2549a746a29c
 */

namespace AppRegistry\Data;

use Walker_Nav_Menu;

/**
 * Nav menu walker
 */
class Array_Walker_Nav_Menu extends Walker_Nav_Menu {

	/**
	 * Prepare item
	 *
	 * @param  object $item  Menu Item.
	 * @param  array  $args  Arguments passed to walk().
	 * @param  int    $depth Item's depth.
	 * @return array
	 */
	protected function prepare_item( $item, $args, $depth ) {
		$title   = apply_filters( 'the_title', $item->title, $item->ID );
		$title   = apply_filters( 'nav_menu_item_title', $title, $item, $args, $depth );
		$classes = apply_filters( 'nav_menu_css_class', array_filter( $item->classes ), $item, $args, $depth );

		return [
			'id'          => absint( $item->ID ),
			'order'       => (int) $item->menu_order,
			'parent'      => absint( $item->menu_item_parent ),
			'title'       => $title,
			'url'         => $item->url,
			'attr'        => $item->attr_title,
			'target'      => $item->target,
			'classes'     => $classes,
			'xfn'         => $item->xfn,
			'description' => $item->description,
			'object_id'   => absint( $item->object_id ),
			'object'      => $item->object,
			'type'        => $item->type,
			'type_label'  => $item->type_label,
			'children'    => [],
		];
	}


	/**
	 * Traverse elements to create list from elements.
	 *
	 * This method should not be called directly, use the walk() method instead.
	 *
	 * @param object $element           Data object.
	 * @param array  $children_elements List of elements to continue traversing.
	 * @param int    $max_depth         Max depth to traverse.
	 * @param int    $depth             Depth of current element.
	 * @param array  $args              An array of arguments.
	 * @param array  $output            Passed by reference. Used to append additional content.
	 */
	public function display_element( $element, &$children_elements, $max_depth, $depth, $args, &$output ) {
		if ( ! $element ) {
			return;
		}

		$id_field = $this->db_fields['id'];
		$id       = $element->$id_field;
		$item     = $this->prepare_item( $element, $args, $depth );

		if ( ! empty( $children_elements[ $id ] ) ) {
			foreach ( $children_elements[ $id ] as $child ) {
				$this->display_element(
					$child,
					$children_elements,
					1,
					( $depth + 1 ),
					$args,
					$item['children']
				);
			}

			unset( $children_elements[ $id ] );
		}

		$output[] = $item;
	}
}
